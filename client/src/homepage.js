import React from 'react';
import './style/homepage.css';
import Header from './header_components/header';

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="Site-Content">
                <Header />
            </div>
        )
    }
}

export default HomePage;