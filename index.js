const { readFile } = require("fs/promises");

// get a random integer from 0 (inclusive) to max (exclusive)
function randomInt(max) {
	return Math.floor(Math.random() * max);
}

const puzzleMinLength = 30;
const wordMinLength = 5;
let words;
function getRandomWord() {
	return words[randomInt(words.length)];
}
async function preload() {
	words = (await readFile("./1000.txt")).toString().split(/\r?\n/).filter(w => w.length >= wordMinLength);
}

async function generate() {
	let puzzle = "";
	while(puzzle.length < puzzleMinLength) {
		puzzle += getRandomWord();
	}
	puzzle = puzzle.split('').sort((c1, c2) => c1.charCodeAt(0) - c2.charCodeAt(0)).join('');
	return puzzle;
}

const numberOfPuzzles = 1;
async function main() {
	await preload();
	for(let i = 1; i <= numberOfPuzzles; i++) {
		console.log(await generate());
	}
}

main().catch(console.error);
