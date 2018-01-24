const log = console.log;

const addFiles = async (ipfs, folderPath) => {
	log('Add files from', folderPath);

	try {
		const hash = await ipfs.util.addFromFs(folderPath, {recursive: true});
		log('hash: ', hash);
	} catch (err) {
		log('err ipfs.add', err);
		throw err;
	}
};

module.exports = addFiles;
