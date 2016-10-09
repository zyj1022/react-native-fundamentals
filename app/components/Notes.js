import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
	ListView,
	TextInput,
	AlertIOS
} from 'react-native';

import api from '../utils/api';
import Badge from './Badge';
import Separator from './Helpers/Separator';

export default class Notes extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		}

	}

	handleChange(event) {
		this.setState({
			note: event.nativeEvent.text
		});
	}

	handleSubmit() {
		var note = this.state.note;
		this.setState({
			note: ''
		});

		// console.log(this.props.userInfo.login);
		console.log(note);

		if(note === '') {
			AlertIOS.alert('敲几个字母呗～', '咋这懒呢～', [{text: '回去敲字'}]);
		} else {
			api.addNote(this.props.userInfo.login, note)
			 .then((data) => {
				 api.getNotes(this.props.userInfo.login)
				 	.then((data) => {
						this.setState({
							dataSource: this.ds.cloneWithRows(data)
						});
					})
			 }).catch((err) => {
				 console.log('Requst failed', err)
				 this.setState({error});
			 });
		 }
	}

	footer() {
		return (
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.props.note}
					onChange={this.handleChange.bind(this)}
					placeholder='New Note'/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor='#88d4f5'>
						<Text style={styles.buttonText}> Submit </Text>
				</TouchableHighlight>
			</View>
		)
	}

	renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
				 	<Text>{rowData}</Text>
				</View>
				<Separator />
			</View>
		)
	}

    render() {
        return (
            <View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo}/> } />
				{this.footer()}
			</View>
        );
    }
};

Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff'
    },
	button: {
		height: 60,
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#48bbec'
	},
	searchInput: {
		height: 60,
		padding: 10,
		fontSize: 18,
		color: '#111',
		flex: 10,
	},
	rowContainer: {
		padding: 10,
	},
	footerContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#e3e3e3',
	}
});
