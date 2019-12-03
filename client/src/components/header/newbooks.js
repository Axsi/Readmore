import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import { connect } from "react-redux";
import { newBooks, freshSearch, imageLoad, orderByNew, headerSelection } from "../../redux/actions";


class NewBooks extends React.Component{
    constructor(props){
        super(props);
        this.handleNewBooks = this.handleNewBooks.bind(this);
    }
    handleNewBooks(event){
        event.preventDefault();
        console.log("clicked handle new books");
        // this.props.fresh();
        this.props.orderByNew({genre: 'Fiction'}); // genre needs to be changed.... instead of having manual input
        // console.log(this.props.orderBy);
        this.props.selection(event.target.text);
        this.props.imageLoad(true);
        this.props.newBooks({
            subject: 'Fiction',
            orderBy: this.props.orderBy,
            language: this.props.language
        });
    }
    render(){
        return(
            <li>
                <a id="New-Button" onClick={this.handleNewBooks} className={this.props.headerSelection === 'New' ?
                    "Header-Selection" : null}>New</a>
            </li>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        subject: state.searchReducer.subject,
        orderBy: state.searchReducer.orderBy,
        language: state.searchReducer.language,
        headerSelection: state.searchReducer.headerSelection
    }
};

const mapDispatchToProps = dispatch => {
    return {
        newBooks: (info)=> dispatch(newBooks(info)),
        // fresh: ()=> dispatch(freshSearch()),
        imageLoad: (status) => dispatch(imageLoad(status)),
        orderByNew: (info)=> dispatch(orderByNew(info)),
        selection: (selection) => dispatch(headerSelection(selection))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewBooks);