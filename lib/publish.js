const resolveCwd = require('resolve-cwd');
const validator = require('is-my-json-valid');
const chalk = require('chalk');

const log = console.log;

const MANIFEST_FILE = 'package.json';

const publish = async () => {
	const manifestPath = resolveCwd(`./${MANIFEST_FILE}`);
	const manifest = require(manifestPath);
	const validate = validator(manifest, 'utf8');

	if (!validate) {
		log(chalk.red(`ERROR: ${MANIFEST_FILE} is not valid`));
		return false;
	}

	log(chalk`Manifest file: {green ${MANIFEST_FILE}} have been found!`);
};

module.exports = publish;
