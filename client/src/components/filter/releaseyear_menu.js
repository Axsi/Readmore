import React from 'react';
import '../../style/filter.css';


const ReleaseMenu = (props)=>{
    console.log("ReleaseMenu");
    return(
        <div id="Release-Menu" ref={props.setWrapperRef}>
            <div className="Menu-Header">
                <span className="Menu-Title">BestSellers By Year</span>
            </div>
            <div id="Slider-Container">
                <form id="Slider-Form" onSubmit={props.releaseSubmit}>
                    <input type="range" name="year" min="2010" max="2019" value={props.year} className="Slider"
                           onChange={props.releaseChange} step="1"/>
                    <input type="range" name="month" min="1" max="12" value={props.month} className="Slider"
                           onChange={props.releaseChange} step="1"/>
                    <input id="Release-Submit" type="submit" value="Search"/>
                </form>
            </div>
        </div>
    )
};

export default ReleaseMenu