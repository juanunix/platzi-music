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

import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const config = {
    apiKey: "AIzaSyBMfSjNAdDKBYLhv2D4RwSh6dlE8kX7SMo",
    authDomain: "platzimusic-57af9.firebaseapp.com",
    databaseURL: "https://platzimusic-57af9.firebaseio.com",
    projectId: "platzimusic-57af9",
    storageBucket: "platzimusic-57af9.appspot.com",
    messagingSenderId: "632962718188"
};

firebase.initializeApp(config);

export default class HomeView extends Component {
    componentDidMount() {
        this._hasPlayServices();
    }
    
    _hasPlayServices() {
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
            this._configure()
        })
        .catch((err) => {
            console.warn("Play services error", err.code, err.message);
        })
    }

    _configure() {
        GoogleSignin.configure({
            //webClientId: '632962718188-37tagq7p2jql3r75uf22hc3ko8gun9la.apps.googleusercontent.com',
        })
        .then(() => {
            this._currentUserAsync();
        });
    }

    _currentUserAsync() {
        GoogleSignin.currentUserAsync().then((user) => {
            this.setState({ user: user });
        }).done();
    }

    _signIn() {
        if (this.state.user == null) {
            GoogleSignin.signIn()
                .then((user) => {
                    this.setState({user: user});
                    this.goToHome();
                })
                .catch((err) => {
                    console.warn('WRONG SIGNIN', err);
                })
                .done();
        } else {
            this.goToHome();
        }
    }

    _signOut() {
        GoogleSignin.signOut()
            .then(() => {
                this.goToHome();
            })
            .catch((err) => {
                console.warn('WRONG SIGNIN', err);
            });
    }

    _getAccessToken() {
        GoogleSignin.getAccessToken()
            .then((token) => {
                console.log(token);
            })
            .catch((err) => {
                console.log(err);
            })
            .done();
    }

    goToHome() {
        Actions.root()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Bienvenidos a Platzi Music
                </Text>
                <GoogleSigninButton
                    style={{ width: 48, height: 48 }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn.bind(this)} />
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