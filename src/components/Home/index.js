import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    Picker,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Item,
    Icon,
    Input,
    Spinner
} from 'native-base';

import styles from '../styles';
import ItemModalView from './ItemModalView';

class Home extends Component {

    state = {
        page: 1,
        sort: 'stars',
        search: '',
        onEndReachedCalledDuringMomentum: false,
        filterVisible: false,
    };

    componentDidMount() {
        this.props.checkConnection();
    }

    handleOnValueChangePicker = (itemValue) => {
        this.handleSearch(itemValue);

        this.setState({
            sort: itemValue,
            filterVisible: false
        });
    };

    handleSearch = (itemValue) => {
        const {
            sort,
            search,
            page
        } = this.state;

        const {
            getSearchData,
            reposData
        } = this.props;

        if (itemValue === 'forks' || itemValue === 'search') {
            getSearchData(itemValue, search);
        }
        else {
            getSearchData(sort, search);
        }

        this.setState({
            page: 1,
        });
    };

    handleOnReachTreshHold = () => {
        const {
            search,
            page,
            sort
        } = this.state;

        const { getNewData } = this.props;

        if (search) {
            getNewData(page + 1, sort, search);

            this.setState({
                page: page + 1,
            });
        }
    };

    keyExtractor = (item, index) => index;

    render() {
        const {
            filterVisible,
            search
        } = this.state;

        const {
            reposData,
            processing,
            newLoading,
            isConnection
        } = this.props;

        if (processing && !newLoading)
            return (
                <View style={styles.container}>
                    <Spinner color='blue' />
                </View>
            )

        return (
            <Container style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header
                        style={{ backgroundColor: 'transparent' }}
                        searchBar
                        rounded
                    >
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                placeholder="Search"
                                returnKeyType="search"
                                autoCapitalize='none'
                                value={search}
                                onChangeText={(search) => this.setState({ search: search })}
                                onEndEditing={this.handleSearch}
                            />
                            <TouchableOpacity onPress={() => this.setState({ filterVisible: true })}>
                                <Icon name="ios-people" />
                            </TouchableOpacity>
                        </Item>
                    </Header>
                    {(filterVisible) && (
                        <Picker
                            style={styles.filterVisible}
                            selectedValue={this.state.sort}
                            onValueChange={(itemValue) => this.handleOnValueChangePicker(itemValue)}
                        >
                            <Picker.Item label="Stars" value="stars" />
                            <Picker.Item label="Forks" value="forks" />
                        </Picker>
                    )}
                    {
                        (reposData && reposData.length < 1 && isConnection) &&
                        (<Text>Offline</Text>)
                    }
                    <FlatList
                        style={styles.flatlist}
                        data={reposData}
                        renderItem={({ item }) =>
                            <ItemModalView
                                data={item}
                            />
                        }
                        keyExtractor={this.keyExtractor}
                        onEndReached={this.handleOnReachTreshHold}
                    />
                    {(processing && newLoading) && (
                        <View style={styles.loading_spinner}>
                            <Spinner color='blue' />
                        </View>)}
                </View>
            </Container>
        );
    }
}

export default Home;