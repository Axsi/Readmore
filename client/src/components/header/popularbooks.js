import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';

class PopularBooks extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li>
                <a id="Popular-Button">Popular</a>
            </li>
        )
    }
}

export default PopularBooks;