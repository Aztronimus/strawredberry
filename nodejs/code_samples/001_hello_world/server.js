// server.js
try {
	// require "http" module
	const http = require("node:http");

	const port = process.env.PORT || 3000;
	const options = {};

	function requestListener(req, res) {
		console.log("client connected, url:", req.url);
		res.statusCode = 200;
		// response.setHeader(name, value)
		res.setHeader("Content-Type", "text/plain");
		// response.end(data)
		// the method response.end() must be called on each response
		res.end("hello world!\n");
	}

	function f() {
		console.log(`running server at http://localhost/${port}\n`);
	}

	const server = http.createServer(requestListener);
	// server.listen(path, callback);
	server.listen(port, f);
} catch(err) {
	console.log(err);
}