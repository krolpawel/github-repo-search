import {
  CAPITALIZED_ERROR_CHANGE,
  CLEAR_RECENT,
  CLEAR_REPOSITORIES_LIST,
  FETCH_REPOSITORIES_REQUEST,
  FETCH_VALUE,
  ITEM_SELECTED,
  ITEM_UNSELECTED,
  RECENT_SEARCH_ITEM_CLICKED,
  REMOVE_ITEM,
  USER_TYPING,
} from './types';

export const repositoriesFetch = searchText => ({
  type: FETCH_REPOSITORIES_REQUEST,
  payload: searchText,
});
export const clearRecent = () => ({ type: CLEAR_RECENT });
export const searchedValueFetch = searchedText => ({ type: FETCH_VALUE, payload: searchedText });
export const userTyping = timeoutF => ({ type: USER_TYPING, payload: timeoutF });
export const capitalizedErrorChange = status => ({
  type: CAPITALIZED_ERROR_CHANGE,
  payload: status,
});
export const itemSelect = id => ({ type: ITEM_SELECTED, payload: id });
export const itemUnselect = id => ({ type: ITEM_UNSELECTED, payload: id });
export const itemRemove = id => ({ type: REMOVE_ITEM, payload: id });
export const recentSearchItemClicked = text => ({
  type: RECENT_SEARCH_ITEM_CLICKED,
  payload: text,
});
export const clearRepositoriesList = () => ({ type: CLEAR_REPOSITORIES_LIST });
