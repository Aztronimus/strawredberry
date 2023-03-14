try {
	const fs = require("node:fs/promises");

	function ownDesc(uid, gid) {
		return `uid: ${uid}\ngid: ${gid}\n`;
	}

	async function afunc() {
		const file = await fs.open("chown_txt.txt", "w");

		await file.writeFile("hello world!!!");

		let stat = await file.stat();
		const uid = stat.uid;
		const gid = stat.gid;

		console.log(ownDesc(uid, gid));

		// filehandle.chown(uid, gid)
		await file.chown(1, 1);

		stat = await file.stat();
		console.log(ownDesc(stat.uid, stat.gid));

		await file.chown(uid, gid);
		await file.close();
	}

	afunc();
} catch(err) {
	console.error(err);
}