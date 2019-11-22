import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/filter.css';
import GenresMenu from './genresmenu';
import menus from '../hoc/menus';
import Chevron from '../../assets/chevron-down.png';

// class Genres extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         const Menu = menus(GenresMenu);
//         return(
//             <li>
//                 <a id="Genres-Button" onClick={this.props.showMenu}>
//                     <div id="Filter-Options-Container">
//                         <span className="Filter-Span">Genres</span>
//                         <img className="Chevron-Down" src={Chevron}/>
//                     </div>
//                 </a>
//                 {this.props.menuVisible ? <Menu onOutsideClick={this.props.hideMenu}/> : null}
//             </li>
//         )
//     }
// }
const Menu = menus(GenresMenu);
const Genres = (props)=>{
    return(
        <li>
            <a id="Genres-Button" onClick={props.showMenu}>
                <div id="Filter-Options-Container">
                    <span className="Filter-Span">Genres</span>
                    <img className="Chevron-Down" src={Chevron}/>
                </div>
            </a>
            {props.menuVisible ? <Menu onOutsideClick={props.hideMenu}/> : null}
        </li>
    )
};
export default Genres;