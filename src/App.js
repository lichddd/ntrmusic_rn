/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import plugin from './plugin'

import React, { Component } from 'react';
import {  TabNavigator,StackNavigator,} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import allplaylist from './views/allplaylist';
import rank from './views/rank';
import search from './views/search';
import home from './views/home';


import song from './views/song';
import playlist from './views/playlist';
import artist from './views/artist';
import album from './views/album';


import Play from './views/play'

import crypto from './util/crypto'
const cryptoreq = crypto({
  "ids": "[" + 528271287 + "]",
  "br": 999000,
  "csrf_token": ""
});
console.log(cryptoreq);
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


 const Tabs = TabNavigator({
   home: {
     screen: home,
     navigationOptions: {
       tabBarLabel: '首页',
       tabBarIcon: ({ tintColor, focused }) => (
         <Ionicons
           name={focused ? 'ios-home' : 'ios-home-outline'}
           size={26}
           style={{ color: tintColor }}
         />
       ),
     },

   },
   rank: {
     screen: rank,
     navigationOptions: {
       tabBarLabel: '排行',
       tabBarIcon: ({ tintColor, focused }) => (
         <Ionicons
           name={focused ? 'ios-trending-down' : 'ios-trending-down-outline'}
           size={26}
           style={{ color: tintColor }}
         />
       ),
     },

   },
   allplaylist: {
     screen: allplaylist,
     navigationOptions: {
       tabBarLabel: '歌单',
       tabBarIcon: ({ tintColor, focused }) => (
         <Ionicons
           name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
           size={26}
           style={{ color: tintColor }}
         />
       ),
     },

   },
   search: {
     screen: search,
     navigationOptions: {
       tabBarLabel: '查询',
       tabBarIcon: ({ tintColor, focused }) => (
         <Ionicons
           name={focused ? 'ios-search' : 'ios-search-outline'}
           size={26}
           style={{ color: tintColor }}
         />
       ),
     },

   },

}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    // activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 16,
    },
    // style: {
    //   backgroundColor: 'blue',
    // },
  },
});
const All = StackNavigator({
  Home: { screen: Tabs },
  song: { screen: song },
  playlist: { screen: playlist },
  artist: { screen: artist },
  album: { screen: album },
}, {
   headerMode: 'none',
   mode: 'modal',}
 );

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <All navigation={this.props.navigation}>
        </All>
        <View style={styles.playbar}>
          <Play></Play>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: ''
  },
  playbar:{
    width:'100%',
    height:50,
  },
});
