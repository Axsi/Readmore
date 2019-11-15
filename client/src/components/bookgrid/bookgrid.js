import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/bookgrid.css';
import { connect } from 'react-redux';
import { infiniteScrollSearch, fetchScroll, imageLoad, newBooks} from "../../redux/actions";
import CircleLoader from 'react-spinners/CircleLoader';
// import {css} from "@emotion/core";

class BookGrid extends React.Component{
    constructor(props){
        super(props);

        this.onScroll = this.onScroll.bind(this);
        this.renderImage =this.renderImage.bind(this);
        this.imagesLoaded = this.imagesLoaded.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        this.props.imageLoad(true);
        this.props.newBooks({
            subject: this.props.subject,
            orderBy: 'newest',
            // orderBy: this.props.orderBy,
            language: this.props.language
        })

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () =>{
        //window.innerHeight is the height (in pixels) of the browser window viewport
        //window.scrollY returns the number of pixels that the document is currently scrolled vertically
        //document.body.offsetHeight returns the height of an element as an integer
        if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight) &&
            (this.props.books.length < this.props.totalBooks) && this.props.loading === false &&
            this.props.imageLoading === false){
            //do next fetch here?
            this.props.infiniteScroll();
            // this.props.imageLoad(true);
            this.props.scroll({
                searchInput: this.props.searchInput,
                index: this.props.index,
                subject: this.props.subject,
                orderBy: this.props.orderBy,
                language: this.props.language});
            // console.log("HI THE FETCH SHOULD START HERE!");
        }
    };

    renderImage(book){
        return (
            (book['volumeInfo']['imageLinks'] ?
                <article className="Book-Article" key={book['id']+book['etag']}>
                    <Link to={"/"} className="Book-Link">
                        <img className="Book-Cover" src={book['volumeInfo']['imageLinks']['smallThumbnail']}
                             onLoad={this.imageStatus}/>
                    </Link>
                </article>
                : null)
        )
    }

    imageStatus = ()=>{
        // console.log("We are inside imageStatus");
        if(this.imagesLoaded(this.bookGrid)){
            this.props.imageLoad(false);
        }

    };
    //will determine the state imageLoading
    imagesLoaded(bookGrid){
        //querySelectorAll will return a node list representing a list of the document's elements that match what you specify
        // console.log("inside imagesLoaded");

        let imgs = [...bookGrid.querySelectorAll('img')];
        for(let i=0; i<imgs.length; i++){
            if(!imgs[i].complete)
                return false;
        }
        return true;
    }
    renderSpinner(){
        if(this.props.imageLoading){
            return (
                <div className="Spinner">
                    <CircleLoader
                    sizeUnit={"px"}
                    size={50}
                    color={'#D6D2C0'}
                    loading={this.props.imageLoading}/>
                </div>
            )
        }else{
            return null;
        }
    }
    //will have to move the article part here into a helper function renderImage!!!!!!!
// {/*<article className="Book-Article" key={book['id']+book['etag']}>*/}
// {/*    <Link to={"/"} className="Book-Link">*/}
// {/*        <img className="Book-Cover" src={book['volumeInfo']['imageLinks']['thumbnail']}/>*/}
// {/*    </Link>*/}
// {/*</article>*/}
    render(){
        return(
            <div id="Search-Results">
                {this.renderSpinner()}
                <section id="Grid-Container" ref={element => {this.bookGrid = element}}
                         style={{display: this.props.imageLoading ? "none" : "grid"}}>
                    {this.props.books.length > 0 ? this.props.books.map((book)=>(
                        this.renderImage(book))): null}
                    {/*{this.renderSpinner()}*/}
                </section>
            </div>
        )
    }
}

// const override = css`display:block; margin: 0 auto;`;

const mapStateToProps = (state) =>{
    return {
        books: state.searchReducer.books,
        totalBooks: state.searchReducer.totalBooks,
        loading: state.searchReducer.loading,
        searchInput: state.searchReducer.searchInput,
        index: state.searchReducer.scrollIndex,
        subject: state.searchReducer.subject,
        orderBy: state.searchReducer.orderBy,
        language: state.searchReducer.language,
        imageLoading: state.searchReducer.imageLoading,
        headerSelection: state.searchReducer.headerSelection
        // scrollLoading: state.searchReducer.scrollLoading
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        infiniteScroll: () => dispatch(infiniteScrollSearch()),
        scroll: (info) => dispatch(fetchScroll(info)),
        imageLoad: (status) => dispatch(imageLoad(status)),
        newBooks: (info) => dispatch(newBooks(info))
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(BookGrid)
