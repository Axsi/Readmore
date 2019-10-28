import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import User from '../../assets/user.png';

class UserButton extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <li id="Header-UserButton">
                <button id="User-Button">
                    <img className="User-Icon" src={User}/>
                </button>
            </li>
        )
    }
}

export default UserButton;