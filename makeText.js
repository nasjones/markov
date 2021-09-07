/** Command-line tool to generate Markov text. */
// import MarkovMachine from markov.js;
const fs = require("fs");
const argv = process.argv;
const validUrl = require("valid-url");
const axios = require("axios");
const markov = require("./markov");

function fileRead(path) {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		try {
			let mm = new markov.MarkovMachine(data);
			console.log(mm.makeText());
			process.exit(0);
		} catch (err2) {
			console.error(err2);
		}
	});
}

async function webRead(url) {
	axios
		.get(url)
		.then((res) => {
			let mm = new markov.MarkovMachine(res.data);
			console.log(mm.makeText());
			process.exit(0);
		})
		.catch((err) => {
			console.error(`Error fetching ${url}:`);
			console.error(err.message);
		});
}

let type = argv[2];
let source = argv[3];

if (type == "file") {
	fileRead(source);
} else if (type == "url") {
	webRead(source);
} else {
	console.error(
		`Invalid command line argument: ${type} \n expected 'file' or 'url'`
	);
	process.exit(1);
}
