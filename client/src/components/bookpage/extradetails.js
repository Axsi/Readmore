import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../style/bookpage.css';

class ExtraDetails extends React.Component{
    constructor(props){
        super(props);

        this.displayISBN = this.displayISBN.bind(this);
    }

    displayISBN(arr){
        if(arr){
            for(let i = 0; i < arr.length; i++){
                if(arr[i].type === "ISBN_13"){
                    return "ISBN13 " + arr[i].identifier;
                }else if(arr[i].type === "ISBN_10"){
                    return "ISBN10 " +"#"+arr[i].identifier;
                }
            }
        }
    }

    render(){
        return(
            <div id="Extra-Details-Container">
                <div id="Page-Number">{this.props.totalPage + " pages"}</div>
                <div id="Published">{"Published " + this.props.publication}</div>
                <div id="Publisher">{"Published by " + this.props.publisher}</div>
                <div id="ISBN">{this.displayISBN(this.props.ISBN)}</div>
            </div>
        )
    }
}

export default ExtraDetails