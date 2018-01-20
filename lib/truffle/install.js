const chalk = require('chalk');
const execa = require('execa');
const resolveCwd = require('resolve-cwd');

const log = console.log;

const install = async () => {
	const TRUFFLE_BIN_PATH = './node_modules/truffle/build/cli.bundled.js';
	const truffleBin = resolveCwd(TRUFFLE_BIN_PATH);

	try {
		await execa(truffleBin, ['init'], {cwd: process.cwd()});
		log(chalk`{green Truffle is now initiliazed.}`);
	} catch (err) {
		if (err.stdout.includes('project already exists')) {
			log(chalk`{green Truffle project already exists. Step Skipped.}`);
			return;
		}

		log(chalk`{red Error initiliazing Truffle.}`);
		throw err;
	}
};

module.exports = {
	title: 'Setting up Truffle',
	task: install
};
