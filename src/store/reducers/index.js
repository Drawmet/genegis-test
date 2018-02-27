import {AsyncStorage} from 'react-native';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import nav from './navigationReducer';
import app from './appReducer';
import user from './userReducer';
import repos from './reposReducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['app', 'repos', 'user']
}

const rootReducer = combineReducers({
    app,
    repos,
    user
})

export default persistReducer(rootPersistConfig, rootReducer)