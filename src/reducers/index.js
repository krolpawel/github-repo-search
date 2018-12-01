import { combineReducers } from "redux";
import TestReducer from "./TestReducer";
import RepositoriesReducer from "./RepositoriesReducer";

export default combineReducers({
    repositories: RepositoriesReducer,
    test: TestReducer
});
