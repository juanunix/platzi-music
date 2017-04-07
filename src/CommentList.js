/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    Text
} from 'react-native';

import Comment from './Comment'

export default class CommentList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds
            //dataSource: ds.cloneWithRows([{text: 'row 1'}, {text: 'row 2'}]),
        }
    }

    componentDidMount() {
        this.updateDataSource(this.props.comments)
        //this.updateDataSource(['awesome!', 'Fine!', 'I Hate him', 'Whatever'])
        //this.updateDataSource([{text: 'awesome!'}, {text: 'Fine!'}])
        //this.updateDataSource({text: 'awesome!'})
    }

    componentWillReceiveProps(newProps) {
        if (newProps.comments !== this.props.comments) {
            this.updateDataSource(newProps.comments);
            //this.updateDataSource(['awesome!', 'Fine!', 'I Hate him', 'Whatever'])
        }
    }

    updateDataSource = (data) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(comment) => {
                    return (
                        <Comment text={comment.text} avatar={comment.userPhoto} />
                    )
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
});