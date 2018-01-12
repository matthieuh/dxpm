const path = require('path');
const execa = require('execa');
const getStream = require('get-stream');
const resolveCwd = require('resolve-cwd');
const userHome = require('user-home');
const makeDir = require('make-dir');
const chalk = require('chalk');
const log = console.log;


const setup = async (pkg, opts) => {
	const truffleBin = resolveCwd('./node_modules/truffle/build/cli.bundled.js');
	const cwd = await makeDir(path.resolve(userHome, '.scaling-fiesta'))

	try {
		execa.sync(truffleBin, ['init'], {cwd}).stdout;
		log(chalk.green('Scaling-Fiesta is now setted up'));
	} catch (err) {
		log(chalk`{bold *** Output: ***}\n${err.message}\n{bold ***************}\n{red Error setting up Scaling-Fiesta.}`);
	}
};

module.exports = setup;
