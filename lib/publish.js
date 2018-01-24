const path = require('path');
const fs = require('fs-extra');
const resolveCwd = require('resolve-cwd');
const validator = require('is-my-json-valid');
const chalk = require('chalk');
const rimraf = require('rimraf');

const connectIpfs = require('./ipfs/connect');
const addFiles = require('./ipfs/add-files');

const log = console.log;

const MANIFEST_FILE = 'package.json';

const publish = async () => {
	const workingDir = process.cwd();
	let manifest;
	let manifestPath;

	try {
		manifestPath = resolveCwd(`./${MANIFEST_FILE}`);
		manifest = require(manifestPath);
	} catch (err) {
		log(chalk.red(`ERROR: manifest file ${MANIFEST_FILE} does not exist.`));
		return false;
	}

	try {
		validator(manifest, 'utf8');
		log(chalk`Manifest file: {green ${MANIFEST_FILE}} have been found!`);
	} catch (err) {
		log(chalk.red(`ERROR: ${MANIFEST_FILE} is not valid`));
		return false;
	}

	if (fs.existsSync(workingDir + '/.dnpm')) {
		rimraf.sync(workingDir + '/.dnpm');
	}

	const dst = path.resolve(process.cwd(), '.dnpm/build');

	manifest.files.forEach(file =>
    fs.copySync(path.resolve(process.cwd(), file), path.resolve(dst, file))
	);

	const ipfs = await connectIpfs();
	log('ipfs ready ...');
	try {
		await addFiles(ipfs, dst);
	} catch (err) {
		log(chalk.red(`ERROR: error adding project files to ipfs.`));
		throw err;
	}
};

module.exports = publish;
