import React from 'react';
import { Link, withRouter} from "react-router-dom";
import '../../style/header.css';

class BestSeller extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li id="Header-BestSeller">
                <a id="Best-Button">BestSeller</a>
            </li>
        )
    }
}

export default BestSeller;