import React, {Component} from 'react';

import {
    StyleSheet,
    NavigatorIOS,
    Text,
    AppRegistry,
    View,
    ScrollView,
    PixelRatio
} from 'react-native';

import Main from './app/components/Main';

class List extends Component {
	goTo() {
        this.props.navigator.push({
            component: Detail,
            title: '邮轮详情1',
            rightButtonTitle: '购物车',
            onRightButtonPress: function() {
                alert('进入我的购物车');
            }
        });
    }
	render() {
        return (
            <ScrollView style={[styles.flex, styles.pad]}>
                <Text style={styles.list_item} onPress={this.goTo.bind(this)}>☆ 豪华邮轮济州岛3日游</Text>
                <Text style={styles.list_item} onPress={this.goTo.bind(this)}>☆ 豪华邮轮台湾3日游</Text>
                <Text style={styles.list_item} onPress={this.goTo.bind(this)}>☆ 豪华邮轮地中海8日游</Text>
            </ScrollView>
        );
    }
}

class Detail extends Component {
    render() {
        return (
            <ScrollView style={styles.pad}>
                <Text>详情页</Text>
                <Text>尽管信息很少，但这就是详情页</Text>
            </ScrollView>
        );
    }
}

class demo extends Component {
    render() {
        return (
			<NavigatorIOS style={[styles.flex]}
				 initialRoute={{
            	component: Main,
            	title: 'Github Note Taker',
            	passProps: {}
        	}}/>
		);
    }
}

var styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    pad: {
        padding: 20
    },
    list_item: {
		height:25,
        // marginBottom: 10,
        borderColor: '#000',
        borderBottomWidth: 1 / PixelRatio.get()
    }
});

AppRegistry.registerComponent('demo', () => demo);
