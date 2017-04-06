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

const { GoogleAuthProvider } = firebase.auth;
const firebaseAuth = firebase.auth();

export default class HomeView extends Component {
    componentDidMount() {
        this._hasPlayServices();
    }

    authenticateUser(accessToken) {
        console.warn("LALA", accessToken);
        const credential = GoogleAuthProvider.credential(accessToken)
        firebaseAuth.signInWithCredential(credential).then(function (user) {
            console.warn("Sign In Success", user);
            var currentUser = user;
            // Merge prevUser and currentUser accounts and data
            // ...
        }, function (error) {
            console.warn("Sign In Error", error);
        });
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
                    this.setState({ user: user });
                    this._getAccessToken()
                })
                .catch((err) => {
                    console.warn('WRONG SIGNIN', err);
                })
                .done();
        } else {
            //this.goToHome();
        }
    }

    _signOut() {
        GoogleSignin.signOut()
            .then(() => {
                this.setState({ user: null });
                //this.goToHome();
                console.warn('SIGN OUT', this.state.user);
            })
            .catch((err) => {
                console.warn('WRONG OUT', err);
            });
    }

    _getAccessToken() {
        GoogleSignin.getAccessToken()
            .then((token) => {
                console.warn("TOKEN", token);
                this.authenticateUser(token)
            })
            .catch((err) => {
                console.warn("WRONG TOKEN", err);
            })
            .done();
    }

    _revokeAccess() {
        GoogleSignin.revokeAccess()
            .then(() => {
                console.log('deleted');
            })
            .catch((err) => {

            })
    }

    goToHome() {
        Actions.root()
    }

    render() {
        let googleButton;
        //console.warn("LALA", this.state.user);


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

                <Icon.Button name="google" backgroundColor="#ddd" onPress={this._signOut.bind(this)}>
                    <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>Log out</Text>
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