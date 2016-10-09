import React, {Component} from 'react';

import {StyleSheet, View, WebView} from 'react-native';

export default class WebSee extends Component {

    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri : this.props.url}}/>
            </View>
        );
    }
}

WebSee.propTypes = {
    url: React.PropTypes.string.isRequired
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f6f6f6'
    }
});
