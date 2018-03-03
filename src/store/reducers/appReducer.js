import * as appActions from '../actions/appActions';
import * as userActions from '../actions/userActions';
import * as reposActions from '../actions/reposActions';

const actionTypes = {
    ...appActions,
    ...userActions,
    ...reposActions
};

const initialState = {
    processing: true,
    newLoading: true,
    isConnection: false
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
                processing: true,
                newLoading: false,
            };
        case actionTypes.ACTION_REPOS_GET_NEW_REQUEST:
            return {
                ...state,
                processing: true,
                newLoading: true
            }
        case actionTypes.ACTION_APP_CONNECTION_SUCCESS:
            return {
                ...state,
                isConnection: action.payload.connection
            }
        case 'persist/REHYDRATE':
        case actionTypes.ACTION_APP_PERSISTOR_LOADED:
        case actionTypes.ACTION_REPOS_GET_SUCCESS:
        case actionTypes.ACTION_REPOS_GET_FAILURE:
        case actionTypes.ACTION_USER_SIGN_IN_SUCCESS:
        case actionTypes.ACTION_USER_SIGN_IN_FAILURE:
        case actionTypes.ACTION_REPOS_GET_NEW_SUCCESS:
        case actionTypes.ACTION_REPOS_GET_NEW_FAILURE:
            return {
                ...state,
                processing: false,
                newLoading: false,
                isConnection: false
            }
        default:
            return state;
    }
};