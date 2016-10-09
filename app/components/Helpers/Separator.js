import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
	Image,
    TouchableHighlight,
} from 'react-native';

export default class Separator extends Component {

	render() {
		return(
			<View style={styles.separator} />
		);
	}
}

var styles = StyleSheet.create({
	separator: {
		flex:1,
		height: 1,
		backgroundColor:'#ececec',
		marginLeft: 15,
		marginRight: 15,
	}
});
