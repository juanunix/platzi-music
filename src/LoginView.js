/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeView extends Component {
    goToHome() {
        Actions.home()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Bienvenidos a Platzi Music
                </Text>
                <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.goToHome()}>
                    Login with Facebook
                </Icon.Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    }
});