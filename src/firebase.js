import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBMfSjNAdDKBYLhv2D4RwSh6dlE8kX7SMo",
    authDomain: "platzimusic-57af9.firebaseapp.com",
    databaseURL: "https://platzimusic-57af9.firebaseio.com",
    projectId: "platzimusic-57af9",
    storageBucket: "platzimusic-57af9.appspot.com",
    messagingSenderId: "632962718188"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();

export default firebase;