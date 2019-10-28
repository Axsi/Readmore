import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';

import magnify from '../../assets/mangify.png';
import filter from '../../assets/funnel.png';

class SearchBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li id="Header-SearchBar">
                <form id="Search">
                    <input id="Search-Input" placeholder="Search books"/>
                    <button id="Search-Button">
                        <img className="Magnify-Icon" src={magnify}/>
                    </button>
                </form>
                <button id="Search-Filter">
                    <img className="Filter-Icon" src={filter}/>
                </button>
            </li>
        )
    }
}

export default SearchBar;