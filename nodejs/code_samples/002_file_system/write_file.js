// write_file.js
try {
	const fs = require("node:fs/promises");

	async function createFile() {
		// fs.open(url, flags)
		// "w" flag is for writing. The file is created (if it does not exist) or truncated (if it exist)
		const file_handle = await fs.open("text.txt", "w");

		// file_handle.writeFile(data, options)
		await file_handle.writeFile("hello world!!!");

		await file_handle.close();
	}

	createFile();

} catch(err) {
	console.error(err);
}