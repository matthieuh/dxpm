const os = require('os');
const download = require('download');
const execa = require('execa');
const chalk = require('chalk');

const log = console.log;

const install = ({mode = 'go'}) => async () => {
	if (mode === 'node') {
		try {
			await execa('npm i ipfs -g');
			log(chalk`{green IPFS is now installed.}`);
			return;
		} catch (err) {
			log(chalk`{red Error installing IPFS}`);
			throw err;
		}
	}

	const VERSION = 'v0.4.13';
	const platform = os.platform();
	let arch = os.arch();

	if (platform === 'darwin') {
		arch = arch ? 'amd64' : '386';
	}

	const goIpfsPath = `https://dist.ipfs.io/go-ipfs/${VERSION}/go-ipfs_${VERSION}_${platform}-${arch}.tar.gz`;

	try {
		await download(goIpfsPath, './.tmp', {extract: true});
		await execa('./.tmp/go-ipfs/install.sh', {cwd: process.cwd()});
		log(chalk`{green IPFS is now installed.}`);
	} catch (err) {
		log(chalk`{red Error installing IPFS}: ${err}`);
		throw err;
	}
};

module.exports = {
	title: 'Installing IPFS',
	task: install({mode: 'go'})
};
