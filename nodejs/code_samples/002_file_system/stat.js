// stat.js
try {
	const fs = require("node:fs/promises");


	async function afunc() {
		const file = await fs.open("stat_text.txt", "w");
		await file.appendFile("line 1\nline 2");
		const stat = await file.stat();

		console.log(stat);

		await file.close();
	}

	afunc();
} catch(err) {
	console.error(err);
}