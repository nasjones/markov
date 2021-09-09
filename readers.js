const fs = require("fs");
const validUrl = require("valid-url");
const axios = require("axios");
const markov = require("./markov");

async function fileRead(path) {
	return fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		try {
			let mm = new markov.MarkovMachine(data);
			let text = mm.makeText();
			console.log(text);
			return text;
		} catch (err2) {
			console.error(err2);
		}
	});
}

async function webRead(url) {
	if (!validUrl.isUri(url)) {
		console.error("Not a valid url");
		process.exit(0);
	}
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

module.exports = { fileRead, webRead };
