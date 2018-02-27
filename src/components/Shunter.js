import React, { Component } from 'react';
import { View } from 'react-native';

import { SignedIn, SignedOut } from '../routers';
import styles from './styles';

class Shunter extends Component {
    render() {
        const { isLogged, processing } = this.props;

        return (
            <View style={styles.container}>
                {
                    !isLogged &&
                    (<SignedOut />)
                }
                {
                    isLogged &&
                    (<SignedIn />)
                }
            </View>
        )
    }
}

export default Shunter;