import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';

class NewBooks extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li id="Header-New">
                <a id="New-Button">New</a>
            </li>
        )
    }
}

export default NewBooks;