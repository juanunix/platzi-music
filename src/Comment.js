import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

const DEFAULT_AVATAR = 'https://exelord.github.io/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';
const AVATAR_SIZE = 32;

const Comment = (props) =>
    <View style={styles.comment}>
        {
            props.avatar ? 
            <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
            <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
        }
        
        <Text style={styles.text}>{props.text}</Text>
    </View>

const styles = StyleSheet.create({
    comment: {
        backgroundColor: '#ecf0f1',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
    }
});

export default Comment