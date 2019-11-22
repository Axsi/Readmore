import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/header.css';
import BookList from './booklist';
import BestSeller from './bestseller';
import NewBooks from './newbooks';
import PopularBooks from './popularbooks';
import SearchBar from './searchbar';
import UserButton from './userbutton';
import { connect } from 'react-redux';
import { orderByNew} from "../../redux/actions";

import TitleImg from '../../assets/title_logo.png';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="Header-Container">
                <ul id="Header-Nav">
                    <li id="Site-Logo">
                        <Link to={{pathname: "/"}} id="Site-Title"
                              // to={orderByNew({genre:'fiction', headerSelection: 'New'})}
                        >
                            <img id="Title-Img" src={TitleImg}/>
                        </Link>
                    </li>
                    <NewBooks />
                    <PopularBooks />
                    <BestSeller />
                    <BookList />
                    <SearchBar />
                    <UserButton />
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        orderByNew: (info)=> dispatch(orderByNew(info))
    }
};

export default connect(null, mapDispatchToProps)(Header);