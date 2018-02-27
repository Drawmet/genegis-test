import * as userActions from '../actions/userActions';

const actionTypes = {
    ...userActions
};

const initialState = {
    isLogged: false
};

/**
 * Application reducer.
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_USER_SIGN_IN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                userData: action.payload.userData
            };
        default:
            return state;
    }
};