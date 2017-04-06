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
    TextInput,
    TouchableOpacity,
} from 'react-native';

import ArtistBox from './ArtistBox'
import CommentList from './CommentList'
import { getArtists } from './api-client'

import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseAuth, firebaseDatabase } from './firebase';

export default class ArtistDetailView extends Component {
    state = {
        comments: []
    }

    componentDidMount() {
        this.getArtistCommentsRef().on('child_added', this.addComment);
    }

    componentWillUnmount() {
        this.getArtistCommentsRef().off('child_added', this.addComment);
    }

    addComment = (data) => {
        const comment = data.val()
        this.setState({
            comments: this.state.comments.concat(comment)
        });
    }

    handleSend = () => {
        const { text } = this.state;
        const { uid, photo } = firebaseAuth.currentUser
        const artistCommentsRef = this.getArtistCommentsRef();
        var newCommentRef = artistCommentsRef.push();
        newCommentRef.set({
            text,
            userPhoto: photo,
            uid
        });
        this.setState({text: ''})
    }

    getArtistCommentsRef = () => {
        const {id} = this.props.artist;
        return firebaseDatabase.ref('comments/' + id);
    }

    handleChangeText = (text) => this.setState({ text })

    render() {
        const artist = this.props.artist
        const {comments} = this.state

        return (
            <View style={styles.container}>
                <ArtistBox artist={artist} />
                <Text style={styles.header}>Comentarios</Text>
                <CommentList comments={comments} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.text}
                        placeholder="Opina sobre este artista"
                        onChangeText={this.handleChangeText} />

                    <TouchableOpacity onPress={this.handleSend}>
                        <Icon name="md-send" size={30} color="#e74c3c" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 55,
    },
    header: {
        fontSize: 20,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    inputContainer: {
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 50,
    }
});