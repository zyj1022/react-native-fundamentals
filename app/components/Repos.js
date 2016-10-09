import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
	Image,
    TouchableHighlight,
	ScrollView
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';
import WebSee from './Helpers/WebSee';

export default class Repos extends Component {

	openPage(url) {
		this.props.navigator.push({
			component: WebSee,
			title: 'Web View',
			passProps: { url: url }
		});
	}

	render() {
		var repos = this.props.repos;
		var list = repos.map((item,index) => {
			var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View/>;
			return (
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, repos[index].html_url)}
							underlayColor='transparent'>
								<Text style={styles.name}> {repos[index].name} </Text>
						</TouchableHighlight>
						<Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
						{desc}
					</View>
				</View>
			)
		});
		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{list}
			</ScrollView>
		);
	}
};

Repos.propTypes = {
		userInfo: React.PropTypes.object.isRequired,
		repos: React.PropTypes.array.isRequired
};

var styles = StyleSheet.create({
	container: {
		flex:1,
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'column',
		padding: 10,
		borderColor: '#ececec',
		borderBottomWidth: 1
	},
	name: {
		color: '#48bbec',
		fontSize: 18,
		paddingBottom: 5,
	},
	stars: {
		color: '#48bbec',
		fontSize: 14,
		paddingBottom: 5
	},
	description: {
		fontSize: 14,
		paddingBottom: 5,
	}
});
