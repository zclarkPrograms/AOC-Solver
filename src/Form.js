import React, {Component***REMOVED*** from "react";

const utils = require("./utils");

class Form extends Component{
    state = {
        formValues: {
            year: '',
            day: '',
            file: ''
    ***REMOVED***,
        solution: ''
***REMOVED***

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        const {name, value***REMOVED*** = event.target;
        formValues[name] = value;
        this.setState({formValues***REMOVED***
        console.log(typeof this.value);
***REMOVED***

    handleSubmit(event) {
        event.preventDefault();
        const {year, day, puzzleInputFile***REMOVED*** = this.state.formValues;

        if (this.state.formValues["file"]) {
            const reader = new FileReader();
            reader.readAsText(puzzleInputFile);
            reader.onload = function () {
                const puzzleInputResult = reader.result;
                let puzzleInput = utils.fromArrayBuffer(puzzleInputResult);

                const formData = new FormData();
                formData.append('year', year);
                formData.append('day', day);
                formData.append('puzzleInput', puzzleInput);

                fetch('http://localhost:5000/solve', {
                    method: 'POST',
                    body: formData
                ***REMOVED***
                    .then(response => response.text())
                    .then(solution => {
                        this.setState({
                            solution: solution
                        ***REMOVED***
                    ***REMOVED***
                    .catch(error => {
                        this.setState({
                            solution: 'Error: ' + error.message
                        ***REMOVED***
                    ***REMOVED***;
        ***REMOVED***;
    ***REMOVED***
***REMOVED***

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)***REMOVED***>
                <section>
                    <label htmlFor="year-selection">Year:</label>
                    <select name="year" id="year-selection" required value={this.state.formValues["year"]***REMOVED*** onChange={this.handleChange.bind(this)***REMOVED***>
                        <option value="">-- Select a year --</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                    </select>
                </section>

                <section>
                    <label htmlFor="day-selection">Day:</label>
                    <select name="day" id="day-selection" required value={this.state.formValues["day"]***REMOVED*** onChange={this.handleChange.bind(this)***REMOVED***>
                        <option key="0" value="">-- Select a day --</option>
                        {Array.from(Array(25).keys())
                            .flatMap((i) => {
                                    let day = i+1;
                                    let day_part_1 = day + "-1";
                                    let day_part_2 = day + "-2";

                                    return [
                                        <option key={day*2-1***REMOVED*** value={day_part_1***REMOVED***>{day_part_1***REMOVED***</option>,
                                        <option key={day*2***REMOVED*** value={day_part_2***REMOVED***>{day_part_2***REMOVED***</option>
                                    ]
                            ***REMOVED***
                            )
                    ***REMOVED***
                    </select>
                </section>

                <input type="file" name="file" id="file" accept=".txt" required value={this.state.formValues["file"]***REMOVED*** onChange={this.handleChange.bind(this)***REMOVED*** />

                <button>Submit</button>

            </form>
        );
***REMOVED***

***REMOVED***

export default Form;