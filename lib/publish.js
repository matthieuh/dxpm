const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const rimraf = require('rimraf');

const getManifest = require('./manifest/get');
const getFiles = require('./manifest/get-files');
const ipfsDaemon = require('./ipfs/daemon');
const addFolder = require('./ipfs/add-folder');

const log = console.log;

const publish = async () => {
	const workingDir = process.cwd();

	if (fs.existsSync(workingDir + '/.dxpm')) {
		rimraf.sync(workingDir + '/.dxpm');
	}

	const manifest = await getManifest();
	const files = await getFiles(manifest);
	const projectName = manifest.pkg.name;

	const dst = path.resolve(process.cwd(), `.dxpm/build/${projectName}`);
	files.forEach(file =>
    fs.copySync(path.resolve(process.cwd(), file), path.resolve(dst, file))
	);

	const ipfs = await ipfsDaemon.start();
	log('ipfs ready ...');

	try {
		const hashList = await addFolder(ipfs, path.resolve(process.cwd(), `.dxpm/build/${projectName}`));
		const hash = hashList.find(hash => hash.path === projectName).hash;
		log(chalk.green(`Package files have been succesfully uploaded to ipfs network!\n(hash: ${hash})`));
	} catch (err) {
		log(chalk.red(`ERROR: error adding project files to ipfs.`));
		throw err;
	}

	ipfsDaemon.stop();
};

module.exports = publish;
