/** Command-line tool to generate Markov text. */
// import MarkovMachine from markov.js;

const argv = process.argv;
const readers = require("./readers");

let type = argv[2];
let source = argv[3];

if (type == "file") {
	readers.fileRead(source);
} else if (type == "url") {
	readers.webRead(source);
} else {
	console.error(
		`Invalid command line argument: ${type} \n expected 'file' or 'url'`
	);
	process.exit(1);
}
