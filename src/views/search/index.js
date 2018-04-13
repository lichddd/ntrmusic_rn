/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


 import React, { Component } from 'react';
 import {  TabNavigator,StackNavigator,} from 'react-navigation';
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import { withNavigation } from 'react-navigation';

 import song from './song';
 import album from './album';
 import playlist from './playlist';
 import artist from './artist';
 import {
   Platform,
   StyleSheet,
   Text,
   View,
   TextInput
 } from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

  const Tabs = TabNavigator({
    search_song: {
      screen: song,
      navigationOptions: {
        tabBarLabel: '单曲',
      },
    },
    search_album: {
      screen: album,
      navigationOptions: {
        tabBarLabel: '专辑',
      },
    },
    search_artist: {
      screen: artist,
      navigationOptions: {
        tabBarLabel: '歌手',
      },
    },
    search_playlist: {
      screen: playlist,
      navigationOptions: {
        tabBarLabel: '歌单',
      },
    },



 }, {
   tabBarPosition: 'top',
   animationEnabled: true,
   lazy:false,
   tabBarOptions: {
     showIcon:false,
     // showLabel:false,
     // activeTintColor: '#e91e63',
     labelStyle: {
       fontSize: 16,
     },
     style: {
       // backgroundColor: 'blue',
       height:25,
       borderTopWidth:0,
       borderBottomWidth:2,
       borderColor:'#4fc08d',
     },
     tabStyle:{
       // borderWidth:1,
       // borderBottomWidth:0,
       // borderColor:'#ababab',
       marginLeft:1,
       marginRight:1,
       width:80,
     },
     activeBackgroundColor:'#4fc08d',
      activeTintColor:'#ffffff',
      inactiveBackgroundColor:'#f4f4f4',
      inactiveTintColor:'#121212',
      allowFontScaling:false,
   },
 });
 // export default Tabs

class Search extends Component <{}> {
   search(str){
     console.log(this.props.navigation);
     RCTDeviceEventEmitter.emit("search",str);
   }
   constructor(props) {
       super(props);
       this.listener=RCTDeviceEventEmitter.addListener("goto",(data)=>{
         this.goto(data.routename,data.params);
       });
       this.state = {
           inputBorderColor: '#ababab'
       };
   }
   goto(routename,params){
     console.log(this.props.navigation);
     this.props.navigation.navigate(routename, params);
   }
   render() {
     return (
       <View style={{flex: 1,}}>

          <TextInput placeholder='输入关键字查询'
            returnKeyType='search'
            selectionColor='#4fc08d'
            onBlur={ () => this.setState({inputBorderColor:'#ababab'}) }
            onFocus={ () => this.setState({inputBorderColor:'#4fc08d'}) }
            style={[styles.input,{borderColor:this.state.inputBorderColor}]}
            editable = {true} maxLength = {100} onSubmitEditing={(e)=>{this.search(e.nativeEvent.text)}}/>
         <Tabs>
         </Tabs>
       </View>

     );
   }
 }
 export default withNavigation(Search)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:20,
  },
  input:{
    // width:'100%',
    padding:5,
    margin:5,
    borderRadius:10,
    backgroundColor:'#ffffff',
    borderWidth:1,

    color:'#4fc08d',
  }

});
