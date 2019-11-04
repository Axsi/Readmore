import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/bookgrid.css';
import { connect } from 'react-redux';
import { infiniteScrollSearch, fetchScroll} from "../../redux/actions";

class BookGrid extends React.Component{
    constructor(props){
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () =>{
        //window.innerHeight is the height (in pixels) of the browser window viewport
        //window.scrollY returns the number of pixels that the document is currently scrolled vertically
        //document.body.offsetHeight returns the height of an element as an integer
        if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) &&
            (this.props.books.length < this.props.totalBooks) && this.props.loading === false){
            //do next fetch here?
            this.props.infiniteScroll();
            this.props.scroll({searchInput: this.props.searchInput, index: this.props.index});
            console.log("HI THE FETCH SHOULD START HERE!");
        }
    };

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
    return {
        books: state.searchReducer.books,
        totalBooks: state.searchReducer.totalBooks,
        index: state.searchReducer.scrollIndex,
        loading: state.searchReducer.loading,
        searchInput: state.searchReducer.searchInput
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        infiniteScroll: () => dispatch(infiniteScrollSearch()),
        scroll: (info) => dispatch(fetchScroll(info))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(BookGrid)
