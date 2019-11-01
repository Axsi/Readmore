import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';

import Chevron from '../../assets/chevron-down.png';

class Genres extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li>
                <a id="Genres-Button">
                    <div id="Filter-Options-Container">
                        <span className="Filter-Span">Genres</span>
                        <img className="Chevron-Down" src={Chevron}/>
                    </div>
                </a>
            </li>
        )
    }
}

export default Genres;