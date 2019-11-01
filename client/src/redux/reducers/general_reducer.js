const initialState = {
    filterBar: false,
};

function generalReducer(state = initialState, action){
    switch(action.type){
        case 'FILTER_VISIBILITY':
            return {
                ...state,
                filterBar: !state.filterBar
            };
        default:
            return state;
    }
}

export default generalReducer;