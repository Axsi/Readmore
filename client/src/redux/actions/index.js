import {
    FILTER_VISIBILITY,
    SEARCHBAR_INPUT,
    INFINITE_SCROLL_SEARCH,
    FETCH_SEARCH_BEGIN,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_ERROR,
    FRESH_SEARCH,
    IMAGE_LOAD,
    // BEST_SELLER_NYT,
    ORDER_BY_NEW,
    HEADER_SELECTION
} from "./action-types";


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

export function freshSearch(payload){
    return {
        type: FRESH_SEARCH,
        payload: payload
    }
}
export function orderByNew(payload){
    return {
        type: ORDER_BY_NEW,
        payload: payload
    }
}
export function imageLoad(payload){
    return {
        type: IMAGE_LOAD,
        payload: payload
    }
}

export function infiniteScrollSearch(){
    return {
        type: INFINITE_SCROLL_SEARCH
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
        // console.log("right before fetchSearchBar fetch call");
        // console.log(input);
        //"https://www.googleapis.com/books/v1/volumes?q=isbn:9781101659809&key="+ process.env.GOOGLE_API_KEY
        //"https://www.googleapis.com/books/v1/volumes?q=intitle:"+input+"&filter=partial&printType=books&maxResults=40&key="+process.env.API_KEY
        return fetch("/searchbar/"+input.searchInput+"/"+input.language)
            .then(handleErrors)
            .then(res => res.json())
            .then(json =>{
                // console.log("searchbar results");
                // console.log(json);
                dispatch(fetchSearchSuccess({items: json.items, totalItems: json.totalItems})); // may have to change how the param is setup here!!!!!!!!!!!!!!!!!!!!!
                // console.log("Inside fetchSearchBar");
                // console.log(json);
                // console.log(json.totalItems);
                // console.log(json.items);
                // return json
            }).catch(error => dispatch(fetchSearchError(error)));
    }
}

export function fetchScroll(info){
    return dispatch=>{
        dispatch(fetchSearchBegin());
        // console.log("inside fetchScroll");
        // console.log(info);
        return fetch("/scroll/"+info.searchInput+"/"+info.index+"/"+info.subject+"/"+info.orderBy+"/"+
            info.language)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchSearchSuccess({items: json.items, totalItems: json.totalItems}));
                // console.log("Inside fetchScroll");
                // console.log(json);
            }).catch(error => dispatch(fetchSearchError(error)));
    }
}
export function newBooks(info){
    return dispatch=>{
        dispatch(fetchSearchBegin());
        return fetch("/newbooks/"+info.subject+"/"+info.orderBy+"/"+info.language)
            .then(handleErrors)
            .then(res=> res.json())
            .then(json=>{
                dispatch(fetchSearchSuccess({items: json.items, totalItems: json.totalItems}));

            }).catch(error=>dispatch(fetchSearchError(error)));
    }
}

//action that calls the fetch to nyt api
export function bestSeller(){
    return dispatch=>{
        dispatch(fetchSearchBegin());
        return fetch("/bestseller")
            .then(handleErrors)
            .then(res=> res.json())
            .then(json => {
                promiseItems(json.results.books).then(data=>{
                    // console.log("Inside bestSeller");
                    // console.log(data);
                    //loop below fixes structure of return due to multiple calls brought into one array
                    let arr = [];
                    for(let i = 0 ; i < 15; i++){
                        arr.push(data[i].items[0]);
                    }
                    console.log(arr);
                    // console.log(total);
                    dispatch(fetchSearchSuccess({items: arr, totalItems: 0}))
                }).catch(error => {
                    console.log(error);
                    dispatch(fetchSearchError(error));
                })
                // dispatch(fetchSearchSuccess({items: json.results.books}))

            })
    }
}

//function that loops and calls google books with nyt response
function promiseItems(arr){
    // console.log("inside promiseItems");
    // console.log(arr);
    //if any of the promises fail, promise.all fails as a whole
    return Promise.all(arr.map(function(book){
        return new Promise(function(resolve,reject){
            //I would say do fetchSearchSuccess after you've gotten the data you need from google books
            // console.log(book);
            // console.log(book['isbns'][0]['isbn13']);
            let info = "intitle:"+book['title']+"+inauthor:"+book['author'];
            // console.log("what is info");
            // console.log(info);
            fetch('/bestseller-cover/'+info)
                .then(handleErrors)
                .then(res=> res.json())
                .then(json=>{
                    // console.log(json);
                    console.log("hi");
                    resolve(json);
                }).catch(error => {
                    console.log(error);
                    reject(error);
            })

        })
    }))
}
//For handling HTTP errors, fetch doesnt?
//currently errors are not being used anywhere with fetchSearchError, apparently we have to render them in component or console.log them there??
function handleErrors(response){
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

