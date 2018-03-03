import {
    NetInfo
} from 'react-native';

export const ACTION_APP_PERSISTOR_LOADED = 'ACTION_APP_PERSISTOR_LOADED';
export const ACTION_APP_CONNECTION_SUCCESS = 'ACTION_APP_CONNECTION_SUCCESS';
export const ACTION_APP_CONNECTION_REQUEST = 'ACTION_APP_CONNECTION_REQUEST';

/**
 * Notify when application loaded and persistor available.
 *
 * @param persistor 'redux-persist' object.
 */
export function persistorLoadedAction(persistor) {
    return {
        type: ACTION_APP_PERSISTOR_LOADED,
        payload: {
            persistor
        }
    }
}

export function isConnectionActionRequest(connection) {
    return {
        type: ACTION_APP_CONNECTION_REQUEST,
    };
}

export function isConnectionActionSuccess(connection) {
    return {
        type: ACTION_APP_CONNECTION_SUCCESS,
        payload: {
            connection: connection
        }
    };
}

export function checkConnectionAction() {
    return dispatch => {
        dispatch(isConnectionActionRequest());
        NetInfo.getConnectionInfo()
            .then((connection) => {
                switch (connection.type) {
                    case 'none':
                        return dispatch(isConnectionActionSuccess(false));
                    case 'unknown':
                        fetch('https://api.github.com/')
                            .then((data) => dispatch(isConnectionActionSuccess(true)))
                            .catch(() => dispatch(isConnectionActionSuccess(false)));
                        return
                    default:
                        return dispatch(isConnectionActionSuccess(true));
                }
            });
    }
}