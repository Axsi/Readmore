import React from 'react';
import { Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import { connect } from "react-redux";
import { bestSeller, freshSearch, imageLoad, headerSelection} from "../../redux/actions";

class BestSeller extends React.Component{
    constructor(props){
        super(props);
        this.handleBestSeller = this.handleBestSeller.bind(this);
    }
    handleBestSeller(event){
        event.preventDefault();
        console.log("clicked bestseller button");
        this.props.fresh();
        this.props.selection(event.target.text);
        this.props.imageLoad(true);
        this.props.bestSeller();
    }
    render(){
        return(
            <li>
                <a id="Best-Button" onClick={this.handleBestSeller} className={this.props.headerSelection ===
                'BestSeller' ? "Header-Selection": null}>BestSeller</a>
            </li>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        headerSelection: state.searchReducer.headerSelection
    }
};
const mapDispatchToProps = dispatch => {
    return {
        bestSeller: () => dispatch(bestSeller()),
        fresh: () => dispatch(freshSearch()),
        imageLoad: (status) => dispatch(imageLoad(status)),
        selection: (selection) => dispatch(headerSelection(selection))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);