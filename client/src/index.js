import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import HomePage from './homepage';
import BookPage from './components/bookpage/bookpage';
import { Provider } from 'react-redux';
import store from './redux/store/index';


const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={HomePage}/>
                <Route path="/bookpage/:id" component={BookPage} />
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
