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

export default class Profile extends Component {
    getRowTitle(user, item) {
        item = (item === 'public_repos') ? item.replace('_', ' ') : item;
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }

    render() {
        var userInfo = this.props.userInfo;
        var topicArr = ['blog', 'location', 'followers', 'following', 'email', 'bio', 'public_repos', 'url', 'company'];
        var list = topicArr.map((item, index) => {
            if (!userInfo[item]) {
                return <View key={index}/>
            } else {
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
                            <Text style={styles.rowContent}>{userInfo[item]}</Text>
                        </View>
						<Separator/>
                    </View>
                )
            }
        });
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo}/>
				{list}
            </ScrollView>
        );
    }
};

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#fff'
    },
    rowContainer: {
        padding: 10,
    },
    rowTitle: {
        color: '#48bbec',
        fontSize: 16
    },
    rowContent: {
        fontSize: 20
    }
});
