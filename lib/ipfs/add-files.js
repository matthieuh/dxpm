const log = console.log;

const addFiles = async (ipfs, folderPath) => {
	try {
		const hash = await ipfs.util.addFromFs(folderPath, {recursive: true, hidden: true});
		log('hash: ', hash);
	} catch (err) {
		throw err;
	}
};

module.exports = addFiles;
