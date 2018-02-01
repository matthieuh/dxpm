const log = console.log;
const ipfsAPI = require('ipfs-api');
const DaemonFactory = require('ipfsd-ctl');

let _ipfs;
let _ipfsd;

const start = async () => new Promise(resolve => {
	if (_ipfsd && _ipfsd.started && _ipfs) {
		return _ipfs;
	}

	const df = DaemonFactory.create({type: 'go'});

	log('Connecting to IPFS network...');

	df.spawn(async (err, ipfsd) => {
		if (err) {
			throw err;
		}

		_ipfsd = ipfsd;
		_ipfs = ipfsAPI(ipfsd.apiAddr);

		resolve(_ipfs);
	});
});

const stop = () => {
	if (_ipfsd && _ipfsd.started) {
		return _ipfsd.stop();
	}

	return true;
};

module.exports = {start, stop};
