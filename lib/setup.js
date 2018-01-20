const chalk = require('chalk');
const Listr = require('listr');
const installTruffle = require('./truffle/install');
const setupIPFS = require('./ipfs/setup');

const log = console.log;

const setup = async () => {
	const tasks = new Listr([
		installTruffle,
		setupIPFS
	]);

	try {
		await tasks.run();
		log(chalk`{green Scaling-Fiesta is now setted up.}`);
	} catch (err) {
		log(chalk`{red Error setting up Scaling-Fiesta.}`);
	}
};

module.exports = setup;
