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

class Home extends React.PureComponent {

    state = {
        page: 1,
        sort: 'stars',
        search: '',
        onEndReachedCalledDuringMomentum: false,
        filterVisible: false,
    };

    handleOnValueChangePicker = (itemValue) => {
        this.handleSearch(itemValue);

        this.setState({
            sort: itemValue,
            filterVisible: false
        });
    };

    handleSearch = (itemValue) => {
        const { sort, search, page } = this.state;
        const { getSearchData, reposData } = this.props;

        if (itemValue) {
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
        const { search, page, sort } = this.state;

        const { getNewData } = this.props;

        if (search && !this.onEndReachedCalledDuringMomentum) {
            getNewData(page + 1, sort, search);

            this.setState({
                page: page + 1,
                onEndReachedCalledDuringMomentum: true
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
            processing
        } = this.props;

        if (processing)
            return (
                <View style={styles.container}>
                    <Spinner color='blue' />
                </View>
            )

        return (
            <Container style={styles.container}>
                <View style={{flex: 1}}>
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
                                onEndEditing={this.handleSearch}
                                autoCapitalize='none'
                                value={search}
                                onChangeText={(search) => this.setState({ search: search })}
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
                        (reposData && reposData.length < 1) &&
                        (<Text>Offline</Text>)
                    }
                    <FlatList
                        style={styles.flatlist}
                        bounces={false}
                        data={reposData}
                        renderItem={({ item }) =>
                            <ItemModalView
                                data={item}
                            />
                        }
                        keyExtractor={this.keyExtractor}
                        onEndReachedThreshold={0}
                        onMomentumScrollBegin={() => this.setState({ onEndReachedCalledDuringMomentum: false })}
                        onMomentumScrollEnd={this.handleOnReachTreshHold}
                    />
                </View>
            </Container>
        );
    }
}

export default Home;