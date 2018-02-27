import React, { Component } from 'react';
import { 
    Modal, 
    WebView, 
    View, 
    Text, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import { 
    Badge, 
    Icon 
} from 'native-base';

import styles from '../styles';

class ItemModalView extends Component {
    state = {
        modalVisible: false
    };

    truncateString = (text) => {
        if(text.length > 29)
            return `${text.substr(0, 27)}...`
        return text;
    };

    render() {
        const { modalVisible } = this.state;

        const {
            data: {
                name,
                forks,
                html_url,
                stargazers_count,
                owner: {
                    login
                }
            }
        } = this.props;

        return (
            <View style={styles.list_item}>
                <View style={styles.webview}>
                    <Modal
                        transparent
                        visible={modalVisible}
                        animationType={'slide'}
                        style={styles.webview}
                        onRequestClose={() => this.setState({modalVisible: false})}
                    >
                    <TouchableOpacity 
                        style={styles.close_button}
                        onPress={() => this.setState({modalVisible: false})}
                    >
                        <Icon name='close'/>
                    </TouchableOpacity>
                        <WebView 
                            source={{ uri: html_url }} 
                            style={styles.webview}
                        />
                    </Modal>
                </View>
                <View style={styles.text_block}>
                    <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={styles.item_title}>{this.truncateString(name)}</Text>
                    </TouchableOpacity>
                    <Text style={styles.item_posted}>{this.truncateString(`Posted by ${login}`)}</Text>
                </View>
                <View style={styles.badge_block}>
                    <Badge primary style={styles.badge_star}>
                        <Text style={styles.badge_text}>
                            {stargazers_count}
                            <Icon style={styles.badge_text} name="star" />
                        </Text>
                    </Badge>
                    <Badge primary style={styles.badge_fork}>
                        <Text style={styles.badge_text}>{forks} forks</Text>
                    </Badge>
                </View>
            </View>
        )
    }
}

export default ItemModalView;