/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class PlatziMusic extends Component {
    render() {
        const image = 'https://pbs.twimg.com/profile_images/766360293953802240/kt0hiSmv.jpg';
        const name = "Metallica";
        const likes = 200;
        const comments = 140;

        return (
            <View style={styles.container}>
                <View style={styles.artistBox}>
                    <Image style={styles.image} source={{ uri: image }} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.row}>
                            <View style={styles.iconContainer}>
                                <Icon name="md-heart" size={30} color="gray" />
                                <Text style={styles.count}>{likes}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon name="md-chatboxes" size={30} color="gray" />
                                <Text style={styles.count}>{comments}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    image: {
        width: 150,
        height: 150,
        paddingTop: 50,
    },
    artistBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        color: '#333'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 15,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
    count: {
        color: 'gray'
    }
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
