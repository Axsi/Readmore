import React from 'react';
import { connect } from 'react-redux';
import { newBooks, freshSearch, imageLoad, orderByNew, fetchReleaseYear } from "../../redux/actions";


function menus(Component){
    class Menus extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                year: 2015,
                month: 6
            };
            this.setWrapperRef = this.setWrapperRef.bind(this);
            this.handleClickOutside = this.handleClickOutside.bind(this);
            this.handleSelections = this.handleSelections.bind(this);
            this.handleReleaseChange = this.handleReleaseChange.bind(this);
            this.handleReleaseSubmit = this.handleReleaseSubmit.bind(this);
        }

        componentDidMount() {
            document.addEventListener('click', this.handleClickOutside);
        }

        componentWillUnmount() {
            document.removeEventListener('click', this.handleClickOutside);
        }
        handleReleaseSubmit(event){
            event.preventDefault();
            console.log("inside handleReleaseSubmit");
            this.props.fresh({headerSelection: 'BestSeller'});
            this.props.imageLoad(true);
            this.props.releaseYear({
                year: this.state.year,
                month: this.state.month
            })

        }

        handleReleaseChange(event){
            console.log("just testing");
            const name = event.target.name;
            const value = event.target.value;
            this.setState({
                [name]: value
            });
            console.log(this.state.year);
            console.log(this.state.month);
        }

        setWrapperRef(node){
            //node being the element that is clicked
            console.log("inside setWrapperRef");
            this.wrapperRef = node;
        }

        handleClickOutside(event){
            //make sure that whatever you clicked is either the menu or any node children in the menu
            if(this.wrapperRef && !this.wrapperRef.contains(event.target)){
                this.props.onOutsideClick(false);
            }
        }

        //handleSelections will be used to fetch from apis depending on the menu options selected
        handleSelections(selection){
            console.log("INSIDE HANDLE SELECTION");
            console.log(selection);
            // this.props.fresh({headerSelection:'New'});
            this.props.orderByNew({genre: selection, headerSelection:'New' });  //change the headerSelection later so it does not entered manually, same for genre
            this.props.imageLoad(true);
            this.props.newBooks({
                subject: selection,
                orderBy: this.props.orderBy,
                language: this.props.language
            })
        }

        render(){
            const props = {
                setWrapperRef: this.setWrapperRef,
                handleSelections: this.handleSelections,
                subject: this.props.subject,
                year: this.state.year,
                month: this.state.month,
                releaseChange: this.handleReleaseChange,
                releaseSubmit: this.handleReleaseSubmit
            };
            return(
                <Component {...props}/>
            )
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(Menus)
}

const mapStateToProps = (state) => {
    return {
        subject: state.searchReducer.subject,
        orderBy: state.searchReducer.orderBy,
        language: state.searchReducer.language
    }
};

const mapDispatchToProps = dispatch => {
    return {
        newBooks: (info) => dispatch(newBooks(info)),
        fresh: (selection) => dispatch(freshSearch(selection)),
        orderByNew: (info) => dispatch(orderByNew(info)),
        imageLoad: (status) => dispatch(imageLoad(status)),
        releaseYear: (info) => dispatch(fetchReleaseYear(info))
    }
};

export default menus