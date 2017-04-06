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

import firebase, {firebaseAuth} from './firebase'; 

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const { GoogleAuthProvider } = firebase.auth;


export default class HomeView extends Component {
    componentWillMount() {
        this._hasPlayServices();
    }

    state = {
        user: null
    }

    authenticateUser = () => {
        const credential = GoogleAuthProvider.credential(this.state.user.idToken)
        firebaseAuth.signInWithCredential(credential).then((user) => {
            this.goToHome()
            //console.warn("FIREBASE", user);
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
            webClientId: '632962718188-uj14nf9no745am3q8j8b410e08beo0m8.apps.googleusercontent.com',
        })
        .then(() => {
            this._currentUserAsync();
        });
    }

    _currentUserAsync() {
        GoogleSignin.currentUserAsync().then((user) => {
            this.setState({ user: user });
            if (this.state.user != null) {
                this.authenticateUser();
            }
        }).done();
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                this.setState({ user: user });
                console.warn('SIGN IN', user);
                this.authenticateUser()
            })
            .catch((err) => {
                console.warn('WRONG SIGNIN', err);
            })
            .done();
    }

    _signOut() {
        GoogleSignin.signOut()
            .then(() => {
                this.setState({ user: null });
                console.warn('SIGN OUT', this.state.user);
            })
            .catch((err) => {
                console.warn('WRONG OUT', err);
            });
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
        let username = null;
        let googleSign = this._signIn;
        let googleSignText = "Log In";
        if (this.state.user != null) {
            username = this.state.user.name;
            googleSign = this._signOut;
            googleSignText = "Log Out";
        }

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Bienvenidos a Platzi Music
                </Text>
                <Text style={styles.welcome}>
                    {username}           
                </Text>

                <Icon.Button name="google" backgroundColor="red" onPress={googleSign.bind(this)}>
                    <Text style={{ fontFamily: 'Arial', color: 'white', fontSize: 15 }}>{googleSignText}</Text>
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