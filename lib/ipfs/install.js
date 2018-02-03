const execa = require('execa');
const chalk = require('chalk');

const log = console.log;

const install = ({mode = 'go'}) => async () => {
	try {
		// Node: https://github.com/ipfs/js-ipfs
		// Go: https://github.com/ipfs/npm-go-ipfs
		const pkgName = mode === 'node' ? 'ipfs' : 'go-ipfs';
		await execa.shell(`npm i -g ${pkgName}`);
		log(chalk`{green IPFS is now installed.}`);
		return;
	} catch (err) {
		log(chalk`{red Error installing IPFS}`);
		throw err;
	}
};

module.exports = {
	title: 'Installing IPFS',
	task: install({mode: 'node'})
};
