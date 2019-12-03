import {
    FILTER_VISIBILITY,
    SEARCHBAR_INPUT,
    INFINITE_SCROLL_SEARCH,
    FETCH_SEARCH_BEGIN,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_ERROR,
    FRESH_SEARCH,
    IMAGE_LOAD,
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
export function headerSelection(payload){
    return {
        type: HEADER_SELECTION,
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
        return fetch("/searchbar/"+input.searchInput+"/"+input.language)
            .then(handleErrors)
            .then(res => res.json())
            .then(json =>{
                dispatch(fetchSearchSuccess({items: json.items, totalItems: json.totalItems})); // may have to change how the param is setup here!!!!!!!!!!!!!!!!!!!!!
            }).catch(error => dispatch(fetchSearchError(error)));
    }
}

export function fetchReleaseYear(info){
    // console.log("hi");
    // console.log(info);
    return dispatch=>{
        dispatch(fetchSearchBegin());
        return fetch('/releaseyear/'+info.year+'/'+info.month)
            .then(handleErrors)
            .then(res => res.json())
            .then(json =>{
                // console.log(json);
                // console.log(json.results.books);
                // console.log("inside the fetch of fetchReleaseYear");
                promiseItems(json.results.books).then(data =>{
                    let arr = [];
                    for(let i = 0 ; i < data.length; i++){
                        if(data[i] !== undefined){
                            arr.push(data[i].items[0]);
                        }
                    }
                    console.log("fetchReleaseYear");
                    console.log(arr);
                    // console.log(total);
                    dispatch(fetchSearchSuccess({items: arr, totalItems: 0}))
                })
            }).catch(error => dispatch(fetchSearchError(error)))
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
                console.log(json);
                promiseItems(json.results.books).then(data=>{
                    //loop below fixes structure of return due to multiple calls brought into one array
                    // console.log(data);
                    let arr = [];
                    for(let i = 0 ; i < data.length; i++){
                        if(data[i] !== undefined){
                                arr.push(data[i].items[0]);
                        }
                    }
                    dispatch(fetchSearchSuccess({items: arr, totalItems: 0}))
                }).catch(error => {
                    console.log(error);
                    dispatch(fetchSearchError(error));
                })
                // dispatch(fetchSearchSuccess({items: json.results.books}))

            }).catch(error=>{
                console.log(error);
                dispatch(fetchSearchError(error));
            })
    }
}

// export function fetchBookPage(volumeId){
//     return dispatch=>{
//         dispatch(fetchSearchBegin());
//         return fetch("/bookpage/"+ volumeId)
//             .then(handleErrors)
//             .then(res => res.json())
//             .then(json=>{
//                 console.log("back in actions bookpage");
//                 console.log(json);
//             })
//     }
// }

//function that loops and calls google books with nyt response
function promiseItems(arr){
    //if any of the promises fail, promise.all fails as a whole
    console.log(arr); //CAN WE DO IT BEFORE THE PROMISE???
    return Promise.all(arr.map(function(book){
        return new Promise(function(resolve,reject){
            //I would say do fetchSearchSuccess after you've gotten the data you need from google books
            let info = "intitle:"+book['title']+"+inauthor:"+book['author'];
            fetch('/bestseller-cover/'+info)
                .then(handleErrors)
                .then(res=> res.json())
                .then(json=>{
                    // console.log(json);
                    // console.log(json);
                    resolve(json);
                }).catch(() => {//////////////its here man!!!!!!!!!!!!!!!
                    // console.log(error);
                    // reject(error);
                    resolve(undefined) //on results with no bookcover, we want the promise.all to pass so we resolve these types to undefined and deal with it with if statement after
            })

        })
    })).catch(error =>{
        console.log(error);
    })
}
//For handling HTTP errors, fetch doesnt?
//currently errors are not being used anywhere with fetchSearchError, apparently we have to render them in component or console.log them there??
function handleErrors(response){
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

