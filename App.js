import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from './src/store';
import Shunter from './src/containers/ShunterContainer';

export default App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Shunter />
        </PersistGate>
    </Provider>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
