import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
	NavigatorIOS
} from 'react-native';

import api from '../utils/api';
import Dashboard from './Dashboard';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isloading: false,
            error: false
        }
    }

    handleChange(event) {
        this.setState({
			username: event.nativeEvent.text
		});
    }

    handleSubmit() {
        this.setState({
			isloading: true
		});
		api.getBio(this.state.username)
			.then((res) =>{
				if(res.message === 'Not Found') {
					this.setState({
						error: 'User not found',
						isloading: false
					});
				} else {
					this.props.navigator.push({
						title: res.name || 'Select an Option',
						component: Dashboard,
						passProps: { userInfo: res }
					});
					console.log(res);
					this.setState({
						isloading: false,
						error: false,
						username: ''
					});
				}
			});
        // console.log('submit', this.state.username);
    }

    render() {
		var showErr= (
			this.state.error ? <Text>{this.state.error}</Text> : <View></View>
		);
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Search For A Github User</Text>
                <TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)}/>
                <TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor='black'>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
				<ActivityIndicator
        			animating={this.state.isloading}
        			color="#000"
        			size="large"
      			/>
				{showErr}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        backgroundColor: '#eee',
        flexDirection: 'column',
		justifyContent:'center',
		backgroundColor:'#5CC9F5'
    },
	title: {
		fontSize:25,
		marginBottom:20,
		textAlign: 'center',
		color: '#fff'
	},
    searchInput: {
        height: 50,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
		fontSize:25,
		borderWidth:1,
		borderColor:"#259fd0"
    },
    button: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
        marginTop: 20,
        borderRadius: 5,
        borderColor: '#F29625',
        borderWidth: 1,
        backgroundColor: '#F29625'
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center',
    }
});
