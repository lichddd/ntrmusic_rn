/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';



export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
    };
  }
  search=async (str)=>{

    console.log(str)
    try {
      let response = await fetch('https://news-at.zhihu.com/api/4/themes');
      let data = await response.json();
      console.log(data);
      this.setState({list:data.others});
    } catch(e) {
      console.log("Oops, error", e);
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          editable = {true} maxLength = {100} onSubmitEditing={(e)=>{this.search(e.nativeEvent.text)}}/>
      <ScrollView style={styles.mainpart}>
          {
            this.state.list.map((li)=>{
              return <Text style={{height: 100, borderColor: 'gray', borderWidth: 1}} 
                           key={li.name}
                           onPress={() => {console.log('aaa');this.props.navigation.navigate('song', {})}}
                      >{li.name}</Text>
            })
          }
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
    padding:20,
  },

});
