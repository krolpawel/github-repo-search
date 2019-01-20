//@flow
import {
    CAPITALIZED_ERROR_CHANGE,
    CLEAR_REPOSITORIES_LIST,
    FETCH_REPOSITORIES_REQUEST,
    FETCH_VALUE,
    ITEM_SELECTED,
    ITEM_UNSELECTED,
    RECENT_SEARCH_ITEM_CLICKED,
    REMOVE_ITEM,
    USER_TYPING,
    CLEAR_RECENT,
} from "./types";

export const repositoriesFetch = (searchText: string): { type: string, payload: string } => {
    return { type: FETCH_REPOSITORIES_REQUEST, payload: searchText };
};
export const clearRecent = () => {
    return { type: CLEAR_RECENT };
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
