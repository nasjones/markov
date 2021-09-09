const argv = process.argv;
const readers = require("./readers");
const fs = require("fs");
const validUrl = require("valid-url");
const axios = require("axios");
const markov = require("./markov");

test("file read", function () {
	let testOut = new markov.MarkovMachine(
		"Hello my name is nassir. Nice to meet you."
	);
	let testText = testOut.makeText();
	console.log(testText);
	expect(testText).toContain("nassir", "Hello", "my", "name", "is");
	expect(testText.split(" ").length).toEqual(100);
});
