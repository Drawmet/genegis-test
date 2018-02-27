import {StackNavigator} from 'react-navigation';

import SignIn from '../containers/SignInContainer';
import Home from '../containers/HomeContainer';

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: 'Sign In'
        }
    }
}, {
    initialRouteName: 'SignIn',
    mode: 'none'
});

export const SignedIn = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            gesturesEnabled: false,
            header: false
        }
    }
}, {
    initialRouteName: 'Home',
    mode: 'none'
});