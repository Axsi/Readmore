import { combineReducers } from "redux";
import generalReducer from './general_reducer';
import searchReducer from './search_reducer';

// const initialState = {
//     filterBar: false,
//     searchInput:'',
//     books: [],
//     searchLoading: false,
//     searchError: null
// };

// function rootReducer(state = initialState, action){
    // switch(action.type){
    //     case 'FILTER_VISIBILITY':
    //         return {
    //             ...state,
    //             filterBar: !state.filterBar
    //         };
    //     case 'SEARCHBAR_INPUT':
    //         return{
    //             ...state,
    //             searchInput: action.payload
    //         };
    //     default:
    //         return state;
    // }
// }

const rootReducer = combineReducers({
    generalReducer,
    searchReducer
});

export default rootReducer;