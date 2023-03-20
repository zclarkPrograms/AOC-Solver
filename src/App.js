import React from 'react';
import './App.css';
import Home from "./Home"
import Solve from "./Solve"
import About from "./About";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
        <div className="App">

        </div >
            <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/solve" element={<Solve/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
