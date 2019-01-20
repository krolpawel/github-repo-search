//@flow
import {
  FETCH_REPOSITORIES_FAILURE,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_REQUEST,
  USER_TYPING,
    CAPITALIZED_ERROR_CHANGE,
    ITEM_SELECTED,
    ITEM_UNSELECTED,
    REMOVE_ITEM,
    CLEAR_REPOSITORIES_LIST,
    CLEAR_RECENT
} from "../actions/types";

type reducerStateType = {
    repositories: Array<any>,
    repositoriesCount: number,
    userTyped: ?number,
    fetchingRepositories: boolean,
    capitalizedError: boolean,
    selectedItems: Array<string>,
    recentSearched: Array<string>
}

const INITIAL_STATE = {
    repositories: [],
    repositoriesCount: 0,
    userTyped: null,
    fetchingRepositories: false,
    capitalizedError: false,
    selectedItems: [],
    recentSearched: [],
};
import _ from 'lodash';

export default (state: reducerStateType = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CLEAR_RECENT:
            return { ...state, recentSearched: [] };
        case CAPITALIZED_ERROR_CHANGE:
            return { ...state, capitalizedError: action.payload };
        case USER_TYPING:
            return { ...state, userTyped: action.payload }
        case FETCH_REPOSITORIES_REQUEST:
            const elementIndex: number = _.indexOf(state.recentSearched, action.payload);
            
            if (elementIndex > -1)
                state.recentSearched.splice(elementIndex, 1);
            state.recentSearched.unshift(action.payload);
            
            return {
                ...state,
                recentSearched: state.recentSearched,
                fetchingRepositories: true,
            };
        case FETCH_REPOSITORIES_SUCCESS:
            return { ...state, repositories: action.payload.items, repositoriesCount: action.payload.total_count, fetchingRepositories: false };
        case FETCH_REPOSITORIES_FAILURE:
            return { ...state, fetchingRepositories: false };
        case ITEM_SELECTED:
            state.selectedItems.push(action.payload);
            return { ...state };
        case ITEM_UNSELECTED:
            state.selectedItems = state.selectedItems.filter((item) => item != action.payload);
            return { ...state };
        case REMOVE_ITEM:
            state.repositories = state.repositories.filter((item) => item.id != action.payload);
            return { ...state }
        case CLEAR_REPOSITORIES_LIST:
            return { ...state, repositories: [] }
        default:
            return state;
    }
};
