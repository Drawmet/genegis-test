import {
    Linking,
    Platform
} from 'react-native';

import {configOAuth} from '../../../config';
import {Navigation} from './navigationActions';

export const ACTION_USER_SIGN_IN_REQUEST = 'ACTION_USER_SIGN_IN_REQUEST';
export const ACTION_USER_SIGN_IN_SUCCESS = 'ACTION_USER_SIGN_IN_SUCCESS';
export const ACTION_USER_SIGN_IN_FAILURE = 'ACTION_USER_SIGN_IN_FAILURE';

function userSignInRequestAction(status) {
    return {
        type: ACTION_USER_SIGN_IN_REQUEST,
        payload: {
            status: status
        }
    };
}

function userSignInSuccessAction(oauth) {
    return {
        type: ACTION_USER_SIGN_IN_SUCCESS,
        payload: {
            userData: {
                oauth
            }
        }
    };
}

function userSignInFailureAction(error) {
    return {
        type: ACTION_USER_SIGN_IN_FAILURE,
        payload: {
            message: error
        }
    };
}



export function userSignInAction(email, password) {
    return (dispatch) => {
        dispatch(userSignInRequestAction('Sign In'));

        const {client_id, client_secret} = configOAuth.github.ios;

        Linking.addEventListener('url', (event) => {
            fetch('https://github.com/login/oauth/access_token', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: client_id,
                    client_secret: client_secret,
                    code: event.url.slice(-20)
                })
            })
                .then((data) => data.json())
                .then((res) => dispatch(userSignInSuccessAction(res.access_token)))
                .catch((error) => dispatch(userSignInFailureAction(error.message)));
        });

        Linking.openURL(`https://github.com/login/oauth/authorize?client_id=${client_id}&username:${email}`)
            .catch((error) => dispatch(userSignInFailureAction(error.message)));
        
    };
}