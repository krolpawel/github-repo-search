import { FETCH_VALUE, RECENT_SEARCH_ITEM_CLICKED } from "../actions/types";
const INITIAL_STATE = {
    searchText: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VALUE:
            console.log('catch FETCH_VALUE: ' + action.payload);
            return { ...state, searchText: action.payload };
        case RECENT_SEARCH_ITEM_CLICKED:
            return { ...state, searchedText: action.payload }
        default:
            return state;
    }
}
