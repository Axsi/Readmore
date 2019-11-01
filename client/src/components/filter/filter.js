import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';
import Genres from './genres';
import ReleaseYear from './releaseyear';
import Rating from './rating';
import { connect } from "react-redux";
import { filterVisibility} from "../../redux/actions";

class Filter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="Filter-Container" style={this.props.filterBar ? {display: ""} : {display: "none"}}>
                <ul id="Filter-Nav">
                    <Genres />
                    <ReleaseYear />
                    <Rating />
                    <li>
                        <button id="Reset-Filters">
                            RESET
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {filterBar: state.generalReducer.filterBar};
};
// dont really need the filterVisibility action here as we are just rendering, not dispatching anything
export default connect(mapStateToProps, { filterVisibility })(Filter);