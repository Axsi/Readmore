import React from 'react';
import './style/homepage.css';
import Header from './components/header/header';
import Filter from './components/filter/filter';
import BookGrid from './components/bookgrid/bookgrid';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="Site-Content">
                <div id="Nav-Holder">
                    <Header />
                    <Filter />
                </div>
                <BookGrid />
            </div>
        )
    }
}

export default HomePage;