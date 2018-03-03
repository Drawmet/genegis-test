import {
    NetInfo
} from 'react-native';

import {
    isConnectionActionSuccess
} from './appActions';

export const ACTION_REPOS_GET_REQUEST = 'ACTION_REPOS_GET_REQUEST';
export const ACTION_REPOS_GET_SUCCESS = 'ACTION_REPOS_GET_SUCCESS';
export const ACTION_REPOS_GET_FAILURE = 'ACTION_REPOS_GET_FAILURE';

export const ACTION_REPOS_GET_NEW_REQUEST = 'ACTION_REPOS_GET_NEW_REQUEST';
export const ACTION_REPOS_GET_NEW_SUCCESS = 'ACTION_REPOS_GET_NEW_SUCCESS';
export const ACTION_REPOS_GET_NEW_FAILURE = 'ACTION_REPOS_GET_NEW_FAILURE';

function getReposRequestAction(status) {
    return {
        type: ACTION_REPOS_GET_REQUEST,
        payload: {
            status: status
        }
    };
}

function getReposSuccessAction(reposData) {
    return {
        type: ACTION_REPOS_GET_SUCCESS,
        payload: {
            reposData: reposData
        }
    };
}

function getReposFailureAction(error) {
    return {
        type: ACTION_REPOS_GET_FAILURE,
        payload: {
            message: error
        }
    };
}

function getRepos(oauth, keywords, page, sort) {
    return dispatch => {
        fetch(`https://api.github.com/search/repositories?code=${oauth}&q=${keywords}&page=${page}&per_page=15&sort=${sort}`)
            .then((data) => data.json())
            .then((repos) => dispatch(getReposSuccessAction(repos.items)))
            .catch((error) => dispatch(getReposFailureAction(error.message)));
    }
}

export function getReposAction(page = 0, sort = 'stars', keywords = 'react-native') {
    return (dispatch, getState) => {
        dispatch(getReposRequestAction('Repositories List'));

        const {
            oauth
        } = getState().user.userData;

        console.log(sort);

        NetInfo.getConnectionInfo().then((connection) => {
            switch (connection.type) {
                case 'none':
                    return dispatch(isConnectionActionSuccess(false));
                case 'unknown':
                    fetch('https://api.github.com/')
                        .then((data) => {
                            dispatch(isConnectionActionSuccess(true));
                            dispatch(getRepos(oauth, keywords, page, sort));
                        })
                        .catch(() => dispatch(isConnectionActionSuccess(false)));
                    return
                default:
                    dispatch(getRepos(oauth, keywords, page, sort));
                    return dispatch(isConnectionActionSuccess(true));
            }
        });
    };
}

function getNewReposRequestAction(status) {
    return {
        type: ACTION_REPOS_GET_NEW_REQUEST,
        payload: {
            status: status
        }
    };
}

function getNewReposSuccessAction(reposData) {
    return {
        type: ACTION_REPOS_GET_NEW_SUCCESS,
        payload: {
            reposData: reposData
        }
    };
}

function getNewReposFailureAction(error) {
    return {
        type: ACTION_REPOS_GET_NEW_FAILURE,
        payload: {
            message: error
        }
    };
}

function getNewRepos(oauth, keywords, page, sort) {
    return dispatch => {
        fetch(`https://api.github.com/search/repositories?code=${oauth}&q=${keywords}&page=${page}&per_page=15&sort=${sort}`)
            .then((data) => data.json())
            .then((repos) => dispatch(getNewReposSuccessAction(repos.items)))
            .catch((error) => dispatch(getNewReposFailureAction(error.message)));
    }
}

export function getNewReposAction(page = 0, sort = 'stars', keywords = 'react-native') {
    return (dispatch, getState) => {
        dispatch(getNewReposRequestAction('Repositories List'));

        const {
            oauth
        } = getState().user.userData;

        NetInfo.getConnectionInfo().then((connection) => {
            switch (connection.type) {
                case 'none':
                    return dispatch(isConnectionActionSuccess(false));
                case 'unknown':
                    fetch('https://api.github.com/')
                        .then((data) => {
                            dispatch(isConnectionActionSuccess(true));
                            dispatch(getNewRepos(oauth, keywords, page, sort));
                        })
                        .catch(() => dispatch(isConnectionActionSuccess(false)));
                    return
                default:
                    dispatch(getNewRepos(oauth, keywords, page, sort));
                    return dispatch(isConnectionActionSuccess(true));
            }
        });
    };
}