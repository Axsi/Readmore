import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import HomePage from './homepage';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={HomePage}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
