const initialState = {
    searchInput:'',
    books: [],
    loading: false,
    error: null
};

function searchBarReducer(state = initialState, action){
    // console.log("inside searchBarReducer");
    // console.log(action);
    switch(action.type){
        case 'SEARCHBAR_INPUT':
            return{
                ...state,
                searchInput: action.payload
            };
        case 'FETCH_SEARCH_BEGIN':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_SEARCH_SUCCESS':
            return{
                ...state,
                loading: false,
                books: action.payload
            };
        case 'FETCH_SEARCH_ERROR':
            return{
                ...state,
                loading: false,
                error: action.payload, //may have to change this!!!!!!!!!!!!!!!!!!!!
                books: [] // may not want to set this back to empty!!!!!!!!!!!!!!!!!
            };
        default:
            return state;
    }
}

export default searchBarReducer;