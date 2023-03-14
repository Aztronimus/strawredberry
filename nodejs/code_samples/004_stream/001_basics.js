// 001_basics.js
try {
	const stream = require("node:stream");
	let destination = "";

	class MyWritable extends stream.Writable {
		// method to send data to the underlying resource
		_write(chunk, encoding, callback) {
			// if callback is not invoked, then the event "drain" will not occur
			if(destination.length + chunk.length >= 256) {
				// operation could not be completed successfully, an error occurred
				callback(Error("Out of limits", { cause: "out_of_limits" }));
			}
			destination += chunk + "\n";
			// operation completed succesfully
			callback(null);
		}

		constructor() {
			const options = {
				highWaterMark: 16
			};
			super(options);
		}
	}


	const my_writable = new MyWritable();

	my_writable.on("error", (err) => {
		console.log(err.code);
	});

	function writeNTimes(n, data, callback) {
		let i = n;

		function write() {
			let ok = true;
			let next = i > 0;
			do {
				if(next) {
					ok = my_writable.write(`line ${i}: ${data}`);
				} else {
					my_writable.write("final line: " + data, callback);
				}
			} while(--i > 0 && ok);
			if(next) {
				my_writable.once("drain", write);
			}
		}

		write();
	}

	writeNTimes(5, "hello world!!!", () => {
		console.log(destination);
	});
} catch(err) {
	console.error(err);
}