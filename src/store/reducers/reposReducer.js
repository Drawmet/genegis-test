import * as reposActions from '../actions/reposActions';

const actionTypes = {
    ...reposActions
}

const initialState = {
    reposData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_REPOS_GET_SUCCESS:
            return {
                ...state,
                reposData: action.payload.reposData
            };
        case actionTypes.ACTION_REPOS_GET_NEW_SUCCESS:
            return {
                ...state,
                reposData: [
                    ...state.reposData,
                    ...action.payload.reposData
                ]
            }
        default:
            return state;
    }
};