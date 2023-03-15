import React, { Component } from 'react';
import './App.css';
import Form from "./Form.js";

class App extends Component {
    render(){
        return (
            <div className="App">
                <nav id="main">
                    <a href="home.html">Home</a>
                    <a href="solve.html">Solve</a>
                    <a href="about.html">About</a>
                </nav>
                <main>
                    <h1>Solver</h1>

                    <Form></Form>

                    <div id="output"></div>
                </main>
            </div >
        );
    }
}

export default App;
