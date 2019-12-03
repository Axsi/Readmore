import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Truncate from 'react-truncate-html';
import '../../style/bookpage.css';

class MetaData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            descriptionType: "truncated"
        };

        this.displayAuthors = this.displayAuthors.bind(this);
        this.displayDescription = this.displayDescription.bind(this);
        this.moreLess = this.moreLess.bind(this);
    }

    // componentDidMount() {
    //     this.displayDescription();
    // }

    displayAuthors(authors){
        let result = authors[0];
        let len = authors.length;
        if(len > 1){
            for(let i = 1; i < len; i++){
                if(authors[i] !== len-1){
                    result.concat(", "+authors[i])
                }else{
                    result.concat(", and "+authors[i]);
                }
            }
        }
        return result;
    }
    displayDescription(){
        console.log("inside displayDesc");
        console.log(this.props.description);
        let description = document.getElementById("Book-Description");
        description.innerHTML = this.props.description;
    }

    moreLess(event){
        event.preventDefault();
        if(this.state.descriptionType === "truncated"){
            this.setState({descriptionType: "full"});
        }else if(this.state.descriptionType === "full"){
            this.setState({descriptionType: "truncated"});
        }
    }

    render(){
        return(
            <div id="Book-Metadata-Container">
                <h1 id="Book-Title">{this.props.title}</h1>
                <h2 id="Book-Author"><span id="By">by </span>{this.props.author ? this.displayAuthors(this.props.author): "unknown"}</h2>
                <div id="Book-Rating">
                </div>
                <div id="Book-Description">
                    {/*dangerouslySetInnerHTML={{__html: this.props.description}}*/}
                    {this.state.descriptionType === "truncated" ?
                        <Truncate lines={10} id="Truncated-Description" dangerouslySetInnerHTML={{__html: this.props.description}}/>:
                        <div id="Full-Description" dangerouslySetInnerHTML={{__html: this.props.description}}/>
                    }
                    <a id="TypeOf-Display" onClick={this.moreLess}>{this.state.descriptionType === "truncated" ? "(more)" : "(less)"}</a>
                </div>
            </div>
        )
    }
}

export default MetaData