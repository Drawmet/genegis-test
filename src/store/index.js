import {AsyncStorage} from 'react-native';
import {applyMiddleware, compose, createStore} from 'redux';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {autoRehydrate, persistStore} from 'redux-persist';

import * as AppActions from './actions/appActions';
import reducers from './reducers';

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.navigation);

const middleware = [
    navigationMiddleware,
    //localeMiddleware,
    thunkMiddleware,
    //notificationMiddleware,
    createLogger()
];

export const store = createStore(
    reducers,
    undefined,
    compose(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store, () => {
    store.dispatch(AppActions.persistorLoadedAction(persistor));
});
