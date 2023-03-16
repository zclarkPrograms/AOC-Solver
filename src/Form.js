import React, {Component} from "react";
import axios from "axios";

const utils = require("./utils");

class Form extends Component{
    state = {
        formValues: {
            year: '',
            day: '',
            puzzleInput: null
        },
        file: null,
        solution: ''
    }

    handleChange(event) {
        event.preventDefault();
        switch(event.target.name){
            case "file":
                this.setState({file: event.target.files[0]})
                break;

            default:
                let formValues = this.state.formValues;
                const {name, value} = event.target;
                formValues[name] = value;
                this.setState({formValues})
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        const file = this.state.file;

        if (file) {
            let reader = new FileReader();

            reader.onload = async (event) => {
                if(event.target.error){
                    this.setState({solution: `Error: ${event.target.error}`})
                    return;
                }

                const puzzleInputResult = reader.result;
                let puzzleInput = utils.fromArrayBuffer(puzzleInputResult);
                let formValues = this.state.formValues;
                formValues["puzzleInput"] = puzzleInput;

                this.setState({formValues});

                axios.post('http://localhost:5000/solve', this.state.formValues)
                    .then(response => response.data)
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

            reader.readAsText(file);
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

                <input type="file" name="file" id="file" accept=".txt" required value={this.state.filename} onChange={this.handleChange.bind(this)} />

                <button>Submit</button>

                <div id="solution">{this.state.solution}</div>

            </form>
        );
    }

}

export default Form;