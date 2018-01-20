const Listr = require('listr');

const installIPFS = require('./install');
const initIPFS = require('./init');

module.exports = {
	title: 'Setting up IPFS',
	task: () => {
		return new Listr([
			installIPFS,
			initIPFS
		]);
	}
};
