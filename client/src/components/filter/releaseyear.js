import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';
import Chevron from '../../assets/chevron-down.png';
import menus from '../hoc/menus';
import ReleaseMenu from './releaseyear_menu';


// class ReleaseYear extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <li>
//                 <a id="ReleaseYear-Button">
//                     <div id="Filter-Options-Container">
//                         <span className="Filter-Span">Release Year</span>
//                         <img className="Chevron-Down" src={Chevron}/>
//                     </div>
//                 </a>
//             </li>
//         )
//     }
// }
const Menu = menus(ReleaseMenu);
const ReleaseYear = (props) => {
    return(
        <li>
            <a id="ReleaseYear-Button" onClick={props.showMenu}>
                <div id="Filter-Options-Container">
                    <span className="Filter-Span">Release Year</span>
                    <img className="Chevron-Down" src={Chevron}/>
                </div>
            </a>
            {props.menuVisible ? <Menu onOutsideClick={props.hideMenu}/> : null}
        </li>
    )
};

export default ReleaseYear;