const execa = require('execa');
const chalk = require('chalk');

const log = console.log;

const init = async () => {
	try {
		await execa('ipfs', ['init']);
		log(chalk`{green IPFS is now initialized.}`);
	} catch (err) {
		if (err.stderr.includes('overwrite your keys')) {
			log(chalk`{green IPFS already initialized. Step Skipped.}`);
			return;
		}

		log(chalk`{red Error initializing IPFS.}`);
		throw err;
	}
};

module.exports = {
	title: 'Initializing IPFS',
	task: init
};
