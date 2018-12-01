//@flow
import type, { Saga } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_REPOSITORIES_REQUEST, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_FAILURE } from "../actions/types";

const ghData = require('../../.ghCredentials.json');

const ghClientId = ghData.ghClientId;
const ghClientSecret = ghData.ghClientSecret;
const credentials = ghClientId && ghClientSecret ? `&client_id=${ghClientId}&client_secret=${ghClientSecret}` : '';

function* fetchRepositories(action) {
    try {
        //TODO: process to safe text
        const encodedQuery: string = action.payload;
        const repositoriesResponse = yield fetch(`https://api.github.com/search/repositories?q=${encodedQuery}${credentials}`).then((response) => { return response.json() });
        console.log(repositoriesResponse);
        yield put({ type: FETCH_REPOSITORIES_SUCCESS, payload: repositoriesResponse });
    } catch (e) {
        yield put({ type: FETCH_REPOSITORIES_FAILURE, payload: e.message });
    }
}

function* repositoriesSaga(): Saga<void> {
    yield takeEvery(FETCH_REPOSITORIES_REQUEST, fetchRepositories);
}

export default repositoriesSaga;