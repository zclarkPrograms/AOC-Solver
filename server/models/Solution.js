***REMOVED***

const solutionSchema = mongoose.Schema({
    year: String,
    day: String,
    text: String,
    language: String,
    filename: String
***REMOVED***;

const Solution = mongoose.model('Solution', solutionSchema, 'Solutions');

module.exports = Solution;