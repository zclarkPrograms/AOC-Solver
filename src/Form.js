import React, {Component} from "react";

const utils = require("./utils");

class Form extends Component{
    state = {
        formValues: {
            year: '',
            day: '',
            file: ''
        },
        solution: ''
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        const {name, value} = event.target;
        formValues[name] = value;
        this.setState({formValues})
        console.log(typeof this.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {year, day, puzzleInputFile} = this.state.formValues;

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
                })
                    .then(response => response.text())
                    .then(solution => {
                        this.setState({
                            solution: solution
                        })
                    })
                    .catch(error => {
                        this.setState({
                            solution: 'Error: ' + error.message
                        })
                    });
            };
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <section>
                    <label htmlFor="year-selection">Year:</label>
                    <select name="year" id="year-selection" required value={this.state.formValues["year"]} onChange={this.handleChange.bind(this)}>
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
                    <select name="day" id="day-selection" required value={this.state.formValues["day"]} onChange={this.handleChange.bind(this)}>
                        <option key="0" value="">-- Select a day --</option>
                        {Array.from(Array(25).keys())
                            .flatMap((i) => {
                                    let day = i+1;
                                    let day_part_1 = day + "-1";
                                    let day_part_2 = day + "-2";

                                    return [
                                        <option key={day*2-1} value={day_part_1}>{day_part_1}</option>,
                                        <option key={day*2} value={day_part_2}>{day_part_2}</option>
                                    ]
                                }
                            )
                        }
                    </select>
                </section>

                <input type="file" name="file" id="file" accept=".txt" required value={this.state.formValues["file"]} onChange={this.handleChange.bind(this)} />

                <button>Submit</button>

            </form>
        );
    }

}

export default Form;