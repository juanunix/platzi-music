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

import {Scene, Router} from 'react-native-router-flux';
import HomeView from './HomeView'

class PlatziMusic extends React.Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="home" component={HomeView}/>
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('PlatziMusic', () => PlatziMusic);
