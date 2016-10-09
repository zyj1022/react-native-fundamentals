import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
	Image,
    TouchableHighlight,
} from 'react-native';

import api from '../utils/api';
import Profile from './Profile';
import Repos from './Repos';
import Notes from './Notes';


export default class Dashboard extends Component {
	makeBackground(btn) {
		var obj = {
			flex:1,
			flexDirection:'row',
			alignSelf:'stretch',
			justifyContent:'center',
		}

		if(btn===0) {
			obj.backgroundColor='#4AF2A1';
		} else if(btn===1) {
			obj.backgroundColor='#5CC9F5';
		} else {
			obj.backgroundColor='#6638F0';
		}

		return obj;
	}

	goToProfile() {
		this.props.navigator.push({
			title: 'Profile Page',
			component: Profile,
			passProps: { userInfo: this.props.userInfo }
		});
	}

	goToRepos() {
		api.getRepos(this.props.userInfo.login)
		.then((res) => {
			this.props.navigator.push({
				title: 'Repos',
				component: Repos,
				passProps: {
					userInfo: this.props.userInfo,
					repos: res
				}
			});
		});
	}

	goToNotes() {
		api.getNotes(this.props.userInfo.login)
		 .then((res) => {
			res = res || {};
			this.props.navigator.push({
				title: 'Notes',
				component: Notes,
				passProps: {
					notes: res,
					userInfo: this.props.userInfo
				}
			})
		 });
	}

	render() {
		return(
			<View style={styles.container}>
				<Image source={{ uri: this.props.userInfo.avatar_url }}
				style={styles.image} />
				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor='#000'>
					<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor='#000'>
					<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor='#000'>
					<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex:1,
		marginTop:65,
		backgroundColor:'#fff'
	},
	image: {
		height:350
	},
	buttonText: {
		fontSize:24,
		alignSelf:'center',
		color:'#fff',
	}
});
