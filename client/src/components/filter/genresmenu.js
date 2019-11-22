import React from 'react';
import '../../style/filter.css';
import Check from '../../assets/checkmark.png';

// class GenresMenu extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <div id="Genres-Menu" ref={this.props.setWrapperRef}>
//                 <p>HI</p>
//             </div>
//         )
//     }
// }

const GenresMenu = (props) =>{
    console.log("what is props");
    console.log(props);
    return(
        <div id="Genres-Menu" ref={props.setWrapperRef}>
            <div className="Menu-Header">
                <span className="Menu-Title">Genres</span>
            </div>
            <div id="Genre-Options-Container">
                <a className="Genre-Options" onClick={(e)=> props.handleSelections(e.target.textContent)}  style={props.subject === 'Fiction' ? {opacity: '50%'}: null}>
                    <img className="Genre-Mark" src={Check}/>
                    <span className="Filter-Span">Fiction</span>
                </a>
                <a className="Genre-Options" onClick={(e)=> props.handleSelections(e.target.textContent)} style={props.subject === 'Religion' ? {opacity: '50%'}: null}>
                    <img className="Genre-Mark" src={Check}/>
                    <span className="Filter-Span">Religion</span>
                </a>
                <a className="Genre-Options" onClick={(e)=> props.handleSelections(e.target.textContent)} style={props.subject === 'Medical' ? {opacity: '50%'}: null}>
                    <img className="Genre-Mark" src={Check}/>
                    <span className="Filter-Span">Medical</span>
                </a>
                <a className="Genre-Options" onClick={(e)=> props.handleSelections(e.target.textContent)} style={props.subject === 'Cooking' ? {opacity: '50%'}: null}>
                    <img className="Genre-Mark" src={Check}/>
                    <span className="Filter-Span">Cooking</span>
                </a>
                <a className="Genre-Options" onClick={(e)=> props.handleSelections(e.target.textContent)} style={props.subject === 'Comedy' ? {opacity: '50%'}: null}>
                    <img className="Genre-Mark" src={Check}/>
                    <span className="Filter-Span">Comedy</span>
                </a>

            </div>
        </div>
    )
};
export default GenresMenu