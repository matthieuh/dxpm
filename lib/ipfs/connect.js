const execa = require('execa');
const ipfsAPI = require('ipfs-api');

const log = console.log;
const TTL = 2 * 1000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const connect = async () => {
	log('connect');
	try {
		execa.shell('ipfs daemon', null, {stdio: 'inherit'});
	} catch (err) {
		log('ipfs daemon error', err);
	}

	await delay(TTL);

	log('after 2sec');

	try {
		const ipfs = await ipfsAPI('/ip4/127.0.0.1/tcp/8080');
		log('Connected succesfully to IPFS !');
		return ipfs;
	} catch (err) {
		log('Error connecting to IPFS', err);
		throw err;
	}
};

module.exports = connect;
