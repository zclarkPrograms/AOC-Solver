const mongoose = require('mongoose');

const solutionSchema = mongoose.Schema({
    year: String,
    day: String,
    text: String,
    language: String,
    filename: String
});

const Solution = mongoose.model('Solution', solutionSchema, 'Solutions');

module.exports = Solution;