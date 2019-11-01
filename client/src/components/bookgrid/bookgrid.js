import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/bookgrid.css';
import { connect } from 'react-redux';
import { fetchSearchBegin, fetchSearchSuccess, fetchSearchError } from "../../redux/actions";

class BookGrid extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {books: state.searchBarReducer.books}
};

export default connect(mapStateToProps)(BookGrid)
