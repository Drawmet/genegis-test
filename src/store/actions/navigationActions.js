	
import type {NavigationParams, NavigationRoute} from 'react-navigation';
import {NavigationActions} from 'react-navigation';

let navigation = null;

export class Navigation {
    static initialize(nav) {
        navigation = nav;
    }

    static reset(routeName: string, params?: NavigationParams) {
        navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        type: NavigationActions.NAVIGATE,
                        routeName,
                        params,
                    }),
                ],
            })
        );
    }

    static navigate(routeName: string, params?: NavigationParams) {
        navigation.dispatch(
            NavigationActions.navigate({
                type: NavigationActions.NAVIGATE,
                routeName,
                params,
            })
        );
    }

    static back(routeName: string, params?: NavigationParams) {
        navigation.dispatch(
            NavigationActions.back({
                type: NavigationActions.NAVIGATE,
                routeName,
                params,
            })
        );
    }
}