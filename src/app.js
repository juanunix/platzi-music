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
    Platform,
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import LoginView from './LoginView'
import HomeView from './HomeView'
import ArtistDetailView from './ArtistDetailView'

class PlatziMusic extends React.Component {
    render() {
        return <Router>
            <Scene key="LoginView" component={LoginView} hideNavBar />
            <Scene key="root">
                <Scene key="home" component={HomeView} hideNavBar />
                <Scene key="artistDetail" component={ArtistDetailView} hideNavBar={false} title="Comentarios" />
            </Scene>
        </Router>
    }
}

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
