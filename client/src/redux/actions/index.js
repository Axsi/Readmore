import { FILTER_VISIBILITY} from "./action-types";
import { SEARCHBAR_INPUT } from "./action-types";
import { FETCH_SEARCH_BEGIN } from "./action-types";
import { FETCH_SEARCH_SUCCESS } from "./action-types";
import { FETCH_SEARCH_ERROR } from "./action-types";

const path = require('path');
// import env from '../../../../.env'
const env = require('dotenv').config({path: __dirname + '/.env'});

//omitted payload for filterVisibility here
export function filterVisibility(){
    return {
        type: FILTER_VISIBILITY
    }
}

export function searchBarInput(payload){
    return {
        type: SEARCHBAR_INPUT,
        payload: payload
    }
}

export function fetchSearchBegin(){
    return {
        type: FETCH_SEARCH_BEGIN
    }
}

export function fetchSearchSuccess(payload){
    return {
        type: FETCH_SEARCH_SUCCESS,
        payload: payload
    }
}

export function fetchSearchError(error){
    return {
        type: FETCH_SEARCH_ERROR,
        payload: error
    }
}

export function fetchSearchBar(input){
    return dispatch=> {
        dispatch(fetchSearchBegin());
        console.log("right before fetchSearchBar fetch call");
        console.log(input);
        //"https://www.googleapis.com/books/v1/volumes?q=isbn:9781101659809&key="+ process.env.GOOGLE_API_KEY
        //"https://www.googleapis.com/books/v1/volumes?q=intitle:"+input+"&filter=partial&printType=books&maxResults=40&key="+process.env.API_KEY
        return fetch("/searchbar/"+input)
            .then(handleErrors)
            .then(res => res.json())
            .then(json =>{
                dispatch(fetchSearchSuccess(json)); // may have to change how the param is setup here!!!!!!!!!!!!!!!!!!!!!
                console.log("Inside fetchSearchBar");
                console.log(json);
                // return json
            }).catch(error => dispatch(fetchSearchError(error)));
    }
}

//For handling HTTP errors, fetch doesnt?
//currently errors are not being used anywhere with fetchSearchError, apparently we have to render them in component or console.log them there??
function handleErrors(response){
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

