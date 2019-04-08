import { FETCH_VALUE, RECENT_SEARCH_ITEM_CLICKED } from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
  searchedText: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VALUE:
      return { ...state, searchText: action.payload };
    case RECENT_SEARCH_ITEM_CLICKED:
      return { ...state, searchedText: action.payload };
    default:
      return state;
  }
};
