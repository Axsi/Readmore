import React from 'react';
import {Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import { connect } from 'react-redux';
import {filterVisibility, searchBarInput, fetchSearchBar, freshSearch, imageLoad} from "../../redux/actions";
import magnify from '../../assets/mangify.png';
import filter from '../../assets/funnel.png';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.checkEnter = this.checkEnter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event){
        event.preventDefault();
        // console.log("We are inside handleSearch");
        // console.log(this.props.searchInput);
        if(this.props.searchInput !== ''){
            this.props.fresh({headerSelection: ''});
            this.props.imageLoad(true);
            this.props.searchBar({
                searchInput:this.props.searchInput,
                language: this.props.language });
        }
    }

    checkEnter(event){
        if(event.keyCode === 13){
            this.handleSearch(event);
        }
    }

    render(){
        return(
            <li id="Header-SearchBar">
                <form id="Search">
                    <input id="Search-Input" placeholder="Search books"
                           onKeyDown={this.checkEnter}
                           onChange={(event) => this.props.searchChange(event.target.value)}
                           value={this.props.searchInput}
                    />
                    <button id="Search-Button" onClick={this.handleSearch}>
                        <img className="Magnify-Icon" src={magnify}/>
                    </button>
                </form>
                <button id="Search-Filter" onClick={this.props.filterClick} >
                    <img className="Filter-Icon" src={filter} />
                </button>
            </li>
        )
    }
}

//im not sure if this works actually or if its even necessary... so mapdispatch searchChange takes event.target.value and changes the state in the reducer, but does it really? need another page to check
const mapStateToProps = (state) =>{
    return {
        searchInput: state.searchReducer.searchInput,
        language: state.searchReducer.language
    }
};

const mapDispatchToProps = dispatch =>{
  return {
      filterClick: () => dispatch(filterVisibility()),
      searchChange: (event)=> dispatch(searchBarInput(event)),
      searchBar: (info) => dispatch(fetchSearchBar(info)),
      fresh: (selection) => dispatch(freshSearch(selection)),
      imageLoad: (status) => dispatch(imageLoad(status))
  }
};

//mapped mapDispatchToProps (connects redux actions to react props
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);