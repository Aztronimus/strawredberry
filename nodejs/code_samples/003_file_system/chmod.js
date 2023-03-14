// chmod.js
try {
	const fs = require("node:fs/promises");

	function modeDescription(mode) {
		// "mode" is an integer, the file mode flag

		// On Windows, only S_IRUSR and S_IWUSR are available.

		function flag(mode, r_mask, w_mask, x_mask) {
			// returns a flag with the following bitmasks:
			// 	1 - execute / search flag is active
			// 	2 - write flag is active
			// 	4 - read flag is active
			if((r_mask || w_mask || x_mask) != undefined) {
				return (mode & x_mask ? 1 : 0) | (mode & w_mask ? 2 : 0) | (mode & r_mask ? 4 : 0);
			}
			return null;
		}

		// first part of the constant name
		// S_I

		// mid-part of the constant name
		// X - execute / search by
		// W - write by
		// R - read by

		// last part of the constant name
		// USR - owner
		// GRP - group
		// OTH - others

		// owner, group and others permissions
		const usr = flag(mode, fs.constants.S_IXUSR, fs.constants.S_IWUSR, fs.constants.S_IRUSR);
		const grp = flag(mode, fs.constants.S_IXGRP, fs.constants.S_IWGRP, fs.constants.S_IRGRP);
		const oth = flag(mode, fs.constants.S_IXOTH, fs.constants.S_IWOTH, fs.constants.S_IROTH);


		const msg = [
			"No permission",
			"Execute only",
			"Write only",
			"Write and execute",
			"Read only",
			"Read and execute",
			"Read and write",
			"Read, write and execute"
		];

		const arr = [
			[usr, " by owner\n"],
			[grp, " by group\n"],
			[oth, " by others\n"]
		];

		let desc = "";

		for(let x of arr) {
			desc += msg[x[0]] || "Undefined";
			desc += x[1];
		}
		return desc.trim();
	}

	async function afunc() {

		const file = await fs.open("chmod_text.txt", "w");

		await file.writeFile("hello world!!!");

		console.log("BEFORE:");
		const b_mode = (await file.stat()).mode;
		console.log(modeDescription(b_mode));

		// Change mode
		await file.chmod(0o000);

		console.log("\nAFTER:");
		const a_mode = (await file.stat()).mode;
		console.log(modeDescription(a_mode));

		// Restore mode
		await file.chmod(b_mode);

		await file.close();
	}

	afunc();
} catch(err) {
	console.error(err);
}