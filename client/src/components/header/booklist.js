import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';

class BookList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li id="Header-BookList">
                <a id="Booklist-Button">Booklist</a>
            </li>
        )
    }
}

export default BookList;