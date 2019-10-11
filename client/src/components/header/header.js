import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/header.css';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="Header-Container">
                <ul id="Header-Nav">
                    <li id="Site-Logo">
                        <p>TEMP LOGO</p>
                    </li>
                    <li id="Header-New">
                    </li>
                    <li id="Header-Popular">
                    </li>
                    <li id="Header-BestSeller">
                    </li>
                    <li id="Header-BookList">
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;