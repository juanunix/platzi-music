/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import ArtistBox from './ArtistBox'
import ArtistList from './ArtistList'

export default class PlatziMusic extends Component {
    render() {
        const artist = {
            image: 'https://pbs.twimg.com/profile_images/766360293953802240/kt0hiSmv.jpg',
            name: "Metallica",
            likes: 200,
            comments: 140,
        };
        const artists = Array(3).fill(artist);

        return (
            <View style={styles.container}>
                <ArtistList artists={artists}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
});

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
