// append_file.js
try {
	const fs = require("node:fs/promises");

	async function afunc() {
		// fs.open(path, flag)
		const file_handle = await fs.open("append.txt", "a");

		// file_handle.appendFile(data, encoding)
		await file_handle.appendFile("line\n");

		await file_handle.close();
	}

	afunc();
} catch(err) {
	console.error(err);
}