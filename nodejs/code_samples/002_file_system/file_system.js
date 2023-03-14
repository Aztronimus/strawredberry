// file_system.js
try {
	const fs = require("node:fs/promises");

	const myBuffer = new Uint8Array(16);

	async function readFile() {
		// fs.open(url)
		const file_handle = await fs.open("file.txt");

		// filehandle.read(buffer, offset, length, position);
		await file_handle.read(myBuffer, 0, 16, 0);

		console.log(String.fromCharCode(...myBuffer));
		await file_handle.close();
	}

	readFile();

} catch(err) {
	console.error(err);
}