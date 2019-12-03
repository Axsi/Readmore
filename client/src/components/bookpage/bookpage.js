import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from '../header/header';
import Filter from '../filter/filter';
import Metadata from './metadata';
import ExtraDetails from './extradetails';
import AuthorBio from './authorbio';
import { fetchSearchBegin, freshSearch, headerSelection, imageLoad} from "../../redux/actions";
import CircleLoader from 'react-spinners/CircleLoader';

import '../../style/bookpage.css';
import '../../style/homepage.css';

class BookPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cover: null,
            title: '',
            author: '',
            totalPage: 0,
            description: '',
            publication: '',
            publisher:'',
            ISBN: ''
        };
        // this.renderImage = this.renderImage.bind(this);
        this.imageStatus = this.imageStatus.bind(this);
        this.imagesLoaded = this.imagesLoaded.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);
    }

    componentDidMount() {
        console.log("inside bookpage");
        let volumeId = this.props.match.params.id;
        // this.props.fresh();
        this.props.selection('');
        fetch("/bookpage/"+ volumeId)
            .then(res => res.json())
            .then(json=>{
                console.log("back in actions bookpage");
                let foundation = json['volumeInfo'];
                console.log(json);
                console.log(this.state);
                this.setState({
                    cover: foundation['imageLinks']['smallThumbnail'],
                    title: foundation['title'],
                    author: foundation['authors'],
                    totalPage: foundation['pageCount'],
                    description: foundation['description'],
                    publication: foundation['publishedDate'],
                    publisher: foundation['publisher'],
                    ISBN: foundation['industryIdentifiers']
                    }
                );
                console.log(this.state);
            })
        // this.props.fetchBookPage(volumeId)
    }

    imageStatus = () =>{
        if(this.imagesLoaded()){
            this.props.imageLoad(false);
        }
    };

    imagesLoaded(){
        return document.getElementById("Book-Page-Cover").complete;
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

    render(){
        return(
            <div id="Site-Content">
                <div id="Nav-Holder">
                    <Header />
                    <Filter />
                </div>
                <div id="Book-Page-Container">
                    {this.renderSpinner()}
                    <div id="Side-Container" >
                        <img id="Book-Page-Cover" src={this.state.cover} onLoad={this.imageStatus}/>
                        <div id="Book-Preview">
                        </div>
                    </div>
                    <div id="Book-Info-Container">
                        <Metadata title={this.state.title} author={this.state.author} description={this.state.description}/>
                        <ExtraDetails totalPage={this.state.totalPage} publication={this.state.publication}
                                      publisher={this.state.publisher} ISBN={this.state.ISBN}/>
                        <AuthorBio />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        imageLoading: state.searchReducer.imageLoading
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        // fetchBookPage: (volumeId) => dispatch(fetchBookPage(volumeId)),
        fresh: () => dispatch(freshSearch()),
        selection: (selection) => dispatch(headerSelection(selection)),
        imageLoad: (status) => dispatch(imageLoad(status))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);