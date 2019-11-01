import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';

import Chevron from '../../assets/chevron-down.png';

class Rating extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li>
                <a id="Rating">
                    <div id="Filter-Options-Container">
                        <span className="Filter-Span">Rating</span>
                        <img className="Chevron-Down" src={Chevron}/>
                    </div>
                </a>
            </li>
        )
    }
}

export default Rating;