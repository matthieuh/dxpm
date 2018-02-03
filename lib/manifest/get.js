const log = console.log;
const readPkgUp = require('read-pkg-up');

const getManifest = () => {
	return readPkgUp().catch(err => log(err));
};

module.exports = getManifest;
