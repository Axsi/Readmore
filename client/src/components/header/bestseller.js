import React from 'react';
import { Link, withRouter} from "react-router-dom";
import '../../style/header.css';

class BestSeller extends React.Component{
    constructor(props){
        super(props);
        this.handleBestSeller = this.handleBestSeller.bind(this);
    }
    handleBestSeller(event){
        event.preventDefault();
        console.log("clicked bestseller button");
    }
    render(){
        return(
            <li>
                <a id="Best-Button" onClick={this.handleBestSeller}>BestSeller</a>
            </li>
        )
    }
}

export default BestSeller;