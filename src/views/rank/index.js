/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {  TabNavigator,StackNavigator,} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import rank1 from './rank1';
import rank2 from './rank2';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu111',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu111',
});

 const Tabs = TabNavigator({
   rank1: {
     screen: rank1,
     navigationOptions: {
       tabBarLabel: '官方榜',
     },
   },
   rank2: {
     screen: rank2,
     navigationOptions: {
       tabBarLabel: '全球榜',
     },
   }


}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    showIcon:false,
    // activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 24,
    },
    style: {
      // backgroundColor: 'blue',
      height:30,
    },
  },
});
export default Tabs

// export default class Rank extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Tabs navigation={this.props.navigation}>
//         </Tabs>
//       </View>
//
//     );
//   }
// }
const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: ''
  },

});
