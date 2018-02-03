const addFiles = (ipfs, folderPath) => {
	try {
		return ipfs.util.addFromFs(folderPath, {recursive: true, hidden: true});
	} catch (err) {
		throw err;
	}
};

module.exports = addFiles;
