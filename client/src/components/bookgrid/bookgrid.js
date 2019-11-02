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
            <div id="Search-Results">
                <section id="Grid-Container">
                    {this.props.books.length > 0 ? this.props.books.map((book)=>(
                        <article className="Book-Article" key={book['id']+book['etag']}>
                            <Link to={"/"} className="Book-Link">
                                <img className="Book-Cover" src={book['volumeInfo']['imageLinks']['thumbnail']}/>
                            </Link>
                        </article>
                        )
                    ): null}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {books: state.searchBarReducer.books}
};

export default connect(mapStateToProps)(BookGrid)
