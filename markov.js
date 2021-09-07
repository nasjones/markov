/** Textual markov chain generator */
class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		this.chains = {};
		for (let i = 0; i < this.words.length - 1; i++) {
			let current = this.words[i];
			let next = this.words[i + 1];
			let word = this.words[i + 2] ? this.words[i + 2] : null;
			if (this.chains[`${current} ${next}`]) {
				this.chains[`${current} ${next}`].push(word);
			} else {
				this.chains[`${current} ${next}`] = [word];
			}
		}
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO
		let output = "";
		let chains = Object.keys(this.chains);
		let current = chains[Math.floor(Math.random() * chains.length)];
		while (output.split(" ").length < numWords) {
			output += `${current}`;
			let follows = this.chains[current];
			let start = follows[Math.floor(Math.random() * follows.length)];
			if (start == null) {
				output += ".";
				current = chains[Math.floor(Math.random() * chains.length)];
			} else {
				let search = chains.filter((key) =>
					key.startsWith(`${start} `)
				);
				current = search[Math.floor(Math.random() * search.length)];
			}
			output += " ";
		}
		return output;
	}
}

module.exports = { MarkovMachine };
