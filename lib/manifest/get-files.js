const getFiles = (manifest = {}) => {
	if (!manifest.pkg || !manifest.pkg.files) {
		return [];
	}

	return manifest.pkg.files;
};

module.exports = getFiles;
