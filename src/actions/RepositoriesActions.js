//@flow
import {
    USER_TYPING,
    FETCH_VALUE,
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE,
    FETCH_REPOSITORIES_REQUEST,
    CAPITALIZED_ERROR_CHANGE,
    ITEM_SELECTED,
    ITEM_UNSELECTED,
    REMOVE_ITEM,
    CLEAR_REPOSITORIES_LIST,
    RECENT_SEARCH_ITEM_CLICKED
} from "./types";

export const repositoriesFetch = (searchText: string): { type: string, payload: string } => {
    return { type: FETCH_REPOSITORIES_REQUEST, payload: searchText };
};
export const searchedValueFetch = (searchedText: string): { type: string, payload: string } => {
  return { type: FETCH_VALUE, payload: searchedText };
};
export const userTyping = (timeoutF: any): { type: string, payload: any } => {
    return { type: USER_TYPING, payload: timeoutF };
};
export const capitalizedErrorChange = (status: boolean): { type: string, payload: boolean } => {
    return { type: CAPITALIZED_ERROR_CHANGE, payload: status };
};
export const itemSelect = (id: string): { type: string, payload: string } => {
    return { type: ITEM_SELECTED, payload: id }
}
export const itemUnselect = (id: string): { type: string, payload: string } => {
    return { type: ITEM_UNSELECTED, payload: id }
}
export const itemRemove = (id: string): { type: string, payload: string } => {
    return { type: REMOVE_ITEM, payload: id}
}
export const recentSearchItemClicked = (text: string): { type: string, payload: string } => {
    return { type: RECENT_SEARCH_ITEM_CLICKED, payload: text}
}
export const clearRepositoriesList = (): { type: string } => {
    return { type: CLEAR_REPOSITORIES_LIST };
}   
