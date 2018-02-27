import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        width,
        height,
        backgroundColor: '#fff'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        width: width * 0.8,
    },
    buttonText: {
        color: '#fff'
    },
    list_item:{
        flex: 1,
        borderWidth: 0.3,
        borderColor: '#c2c0c6'
    },
    badge_star: {
        backgroundColor: 'blue',
        margin: 3
    },
    badge_fork: {
        backgroundColor: 'black',
        margin: 3
    },
    item_title: {
        minWidth: width * 0.8,
        color: '#59585b',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 3
    },
    item_posted: {
        color: '#898591',
        fontSize: 13,
        maxWidth: width * 0.6,
        padding: 3,
        justifyContent: 'flex-start'
    },
    badge_text: {
        fontSize: 13,
        color: 'white',
        maxWidth: width * 0.3,
        padding: 3,
    },
    text_block: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    badge_block: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    webview: {
        position: 'absolute',
        top: 50,
        left: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        width: width * 0.8,
        height: height * 0.8
    },
    close_button:{
        position: 'relative',
        top: height * 0.1,
        left: width * 0.1,
        backgroundColor: '#fff',
        zIndex: 1
    },
    flatlist: {
        flex: 1,
        width,
        height
    },
    picker: {
        height: 50
    }
})