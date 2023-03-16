const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse request body as text
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// POST endpoint for solving Advent of Code puzzles
app.post('/solve', (req, res) => {
    const { year, day, puzzleInput } = req.body;
    // Call your Advent of Code solver function with year, day, and puzzleInput
    const solution = solveAdventOfCode(year, day, puzzleInput);
    console.log(req.body);
    res.send(solution);
});

// Start server
app.listen(5000, () => {
    console.log('Server started on port 5000');
});

function solveAdventOfCode(year, day, puzzleInput) {
    return `year: ${year}, day: ${day}, puzzleInput: ${puzzleInput}`;
}
