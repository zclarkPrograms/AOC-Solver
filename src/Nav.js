import React from "react";
import {Link} from 'react-router-dom';

function Nav(){
    return (
        <nav id="main">
            <Link to="/home">Home</Link>
            <Link to="/solve">Solve</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}

export default Nav;