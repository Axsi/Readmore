const initialState = {
    searchInput:'',
    scrollIndex:0,
    books: [],
    // bestSeller:[],
    totalBooks: 0,
    loading: false,
    imageLoading: false,
    // scrollLoading: false,
    error: null
};

function searchReducer(state = initialState, action){
    // console.log("inside searchReducer");
    // console.log(action);
    switch(action.type){
        case 'SEARCHBAR_INPUT':
            return{
                ...state,
                // scrollIndex: 0,
                searchInput: action.payload
            };
        case 'INFINITE_SCROLL_SEARCH':
            return{
                ...state,
                scrollIndex: state.scrollIndex + 36
            };
        case 'IMAGE_LOAD':
            return{
              ...state,
              imageLoading: action.payload
            };
        case 'FRESH_SEARCH':
            return{
                ...state,
                books: [],
                scrollIndex: 0
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
                books: state.books.concat(action.payload.items),
                totalBooks: (state.totalBooks !== action.payload.totalItems ?
                    action.payload.totalItems : state.totalBooks)
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

export default searchReducer;