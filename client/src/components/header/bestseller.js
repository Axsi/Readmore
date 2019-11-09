import React from 'react';
import { Link, withRouter} from "react-router-dom";
import '../../style/header.css';
import { connect } from "react-redux";
import { bestSeller, freshSearch, imageLoad} from "../../redux/actions";

class BestSeller extends React.Component{
    constructor(props){
        super(props);
        this.handleBestSeller = this.handleBestSeller.bind(this);
    }
    handleBestSeller(event){
        event.preventDefault();
        console.log("clicked bestseller button");
        this.props.fresh();
        this.props.imageLoad(true);
        this.props.bestSeller();
    }
    render(){
        return(
            <li>
                <a id="Best-Button" onClick={this.handleBestSeller}>BestSeller</a>
            </li>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bestSeller: () => dispatch(bestSeller()),
        fresh: () => dispatch(freshSearch()),
        imageLoad: (status) => dispatch(imageLoad(status))
    }
};
export default connect(null, mapDispatchToProps)(BestSeller);