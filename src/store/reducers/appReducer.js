import * as appActions from '../actions/appActions';
import * as userActions from '../actions/userActions';
import * as reposActions from '../actions/reposActions';

const actionTypes = {
    ...appActions,
    ...userActions,
    ...reposActions
};

const initialState = {
    processing: true
};

/**
 * Application reducer.
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_USER_SIGN_IN_REQUEST:
        case actionTypes.ACTION_REPOS_GET_REQUEST:
            return {
                ...state,
                processing: true
            };
        case 'persist/REHYDRATE':
        case actionTypes.ACTION_APP_PERSISTOR_LOADED:
        case actionTypes.ACTION_REPOS_GET_SUCCESS:
        case actionTypes.ACTION_REPOS_GET_FAILURE:
        case actionTypes.ACTION_USER_SIGN_IN_SUCCESS:
        case actionTypes.ACTION_USER_SIGN_IN_FAILURE:
            return {
                ...state,
                processing: false
            };
        default:
            return state;
    }
};