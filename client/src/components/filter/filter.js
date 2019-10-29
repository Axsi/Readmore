import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';
import { connect } from "react-redux";
import { filterVisibility} from "../../redux/actions";

class Filter extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
            {this.props.filterBar ? (
                    <div id="Filter-Container">
                        <ul id="Filter-Nav">
                            <li>

                            </li>
                        </ul>
                    </div>
                ): null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {filterBar: state.filterBar};
};
// dont really need the filterVisibility action here as we are just rendering, not dispatching anything
export default connect(mapStateToProps, { filterVisibility })(Filter);