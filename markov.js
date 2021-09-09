/** Textual markov chain generator */
class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.text = this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		this.chains = {};
		for (let i = 0; i < this.words.length; i++) {
			let current = this.words[i];
			let word = this.words[i + 1] ? this.words[i + 1] : null;
			if (this.chains[`${current}`]) {
				this.chains[`${current}`].push(word);
			} else {
				this.chains[`${current}`] = [word];
			}
		}
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO
		let output = [];
		let chainKeys = Object.keys(this.chains);
		let current = chainKeys[Math.floor(Math.random() * chainKeys.length)];
		while (output.length < numWords) {
			output.push(current);
			let follows = this.chains[current];
			let start = follows[Math.floor(Math.random() * follows.length)];
			current = start ? start : [chainKeys[0]];

			// if (start == null) {
			// 	current = chains[Math.floor(Math.random() * chains.length)];
			// } else {
			// 	// let search = chains.filter((key) =>
			// 	// 	key.startsWith(`${start} `)
			// 	// );

			// 	// if (search.length == 0) {
			// 	// 	output.push(start);
			// 	// 	search = [chains[0]];
			// 	// }
			// 	current = search[Math.floor(Math.random() * search.length)];
			// }
		}
		return output.join(" ");
	}
}

module.exports = { MarkovMachine };
