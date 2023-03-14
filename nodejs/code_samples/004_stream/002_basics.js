// 002_basics.js
try {
	const stream = require("node:stream");
	let resource = {
		index: 0,
		data: "data from the resource."
	};

	console.log(resource.length);

	class MyReadable extends stream.Readable {
		// method to fetch data from the underlying resource
		_read(size) {
			this.push()
		}

		constructor() {
			const options = {
				highWaterMark: 16
			};
			super(options);
		}
	}
} catch(err) {
	console.error(err);
}