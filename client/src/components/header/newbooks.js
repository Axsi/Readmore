import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import { connect } from "react-redux";
import { newBooks, freshSearch, imageLoad, orderByNew } from "../../redux/actions";


class NewBooks extends React.Component{
    constructor(props){
        super(props);
        this.handleNewBooks = this.handleNewBooks.bind(this);
    }
    handleNewBooks(event){
        event.preventDefault();
        console.log("clicked handle new books");
        // this.props.fresh();
        this.props.orderByNew({genre: 'fiction', headerSelection: event.target.text});
        console.log(this.props.orderBy);
        this.props.imageLoad(true);
        this.props.newBooks({
            subject: this.props.subject,
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
        orderByNew: (info)=> dispatch(orderByNew(info))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewBooks);