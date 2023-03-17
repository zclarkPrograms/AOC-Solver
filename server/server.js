const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Solution = require('./models/Solution.js');
const solve = require('./docker/solve.js');

require('dotenv').config()


// Parse request body as text
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// POST endpoint for solving Advent of Code puzzles
app.post('/solve', async (req, res) => {
    const { year, day, puzzleInput } = req.body;

    const solution = await solveAdventOfCode(year, day, puzzleInput);

    res.send(solution);
});

app.post('/upload', async (req, res) => {
    try {
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
    const {id} = req.body;

    const result = await Solution.findByIdAndRemove(id);

    res.send(result);
})

const CONNECTION_URL = `mongodb+srv://SlothsAllTheWay:${process.env.MONGODB_PASSWORD}@cluster0.rulcp6z.mongodb.net/?retryWrites=true&w=majority`
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
