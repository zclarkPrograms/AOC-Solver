const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Solution = require('./models/Solution.js');
const solve = require('./docker/solve.js');

require('dotenv').config()


// Parse request body as text
app.use(bodyParser.json());
app.use(cors());

// POST endpoint for solving Advent of Code puzzles
app.post('/solve', async (req, res) => {
    const { year, day, puzzleInput } = req.body;

    const solution = await solveAdventOfCode(year, day, puzzleInput);

    res.send(solution);
});

app.post('/upload', async (req, res) => {
    try {
        const {year, day} = req.body;
        await Solution.deleteMany({"year": year, "day": day});

        const solution = new Solution(req.body);
        await solution.save();

        res.status(201).send(solution);
    } catch (err) {
        res.status(400).send(err);
    }
})

app.get('/files', async (req, res) => {
    const solution = await Solution.find();
    res.send(solution);
})

app.get('/file', async (req, res) => {
    const { year, day } = req.body;

    let solution = await Solution.find({"year": year, "day": day});

    if(!solution){
        res.send("No solution for given year and day");
    }

    res.send(solution);
})

app.get('/remove', async (req, res) => {
    const {id, year, day} = req.body;

    if(year && day){
        res.send(await Solution.deleteMany({"year": year, "day": day}));
        return;
    }

    const result = await Solution.findByIdAndRemove(id);

    res.send(result);
})

app.get('/removeAll', async (req, res) => {
    res.send(await Solution.deleteMany());
})

const CONNECTION_URL = `***REMOVED***`
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true })
    .then(() =>{
        app.listen(PORT, () =>{
            console.log(`Server running on port: ${PORT} `)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })

async function solveAdventOfCode(year, day, puzzleInput) {
    let solution = await Solution.findOne({"year": year, "day": day});

    if(!solution){
        return "No solution for given year and day";
    }

    const {text, language, filename} = solution;

    let output = await solve(puzzleInput, text, language, filename);

    if(!output){
        return "Unable to solve";
    }

    return output;
}
