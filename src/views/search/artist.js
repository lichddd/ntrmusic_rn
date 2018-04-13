/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import qs from 'qs';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';


export default class App extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
          list: []
      };
      this.listener=null;
      this.navigationlistener=null;
      this.search_str="";
  }
  componentDidMount() {
    console.log(this.props.navigation);
    this.navigationlistener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.search(this.search_str);
      }
    );


    this.listener=RCTDeviceEventEmitter.addListener("search",(str)=>{
      this.search_str=str;
      console.log(this.props.navigation);
      if (this.props.navigation.state&&this.props.navigation.isFocused()) {
        this.search(this.search_str);
      }
    });
  }
  componentWillUnmount()
  {
    this.listener&&this.listener.remove();
    this.navigationlistener&&this.navigationlistener.remove();
  }
  async search(str){
    if (!this.search_str) {
      return ;
    }


    let response = await fetch(`https://music.163.com/api/search/pc`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'http://music.163.com',
            'Cookie': 'appver=2.0.2',
            'Host': 'music.163.com',
            // 'Cookie': cookie,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
        },
        body:qs.stringify({
                  s:str,
                  offset:0,
                  limit:20,
                  type:100,
                })
    });
    let data = await response.json();
    console.log(data);
    this.setState({list:data.result.artists})
  }
  render() {
    return (
        <ScrollView style={styles.container}>
            {
              this.state.list && this.state.list.map((li,i) => {
                  return <View style={[{flex:1,width:'100%',padding:10,},i%2?{}:{backgroundColor:'#f4f4f4'}]}  key={li.id+li.name}>
                    <TouchableOpacity onPress={() => {
                            RCTDeviceEventEmitter.emit("goto",{routename:'artist',params:{id:li.id}});
                        }}>
                        <View style={{flex:1,flexDirection: 'row',alignItems:'center',height:50,}}>
                          <ImageBackground
                            style={{width:50,height:50}}
                            source={{
                                  uri: li.img1v1Url&&(li.img1v1Url + `?param=50y50`)
                              }}
                            defaultSource={require('../../assets/disk.png')}
                              >
                          </ImageBackground>

                        <View style={styles.songs}>

                      <Text style={styles.songname} numberOfLines={1}>{li.name}</Text>
                      </View>
                      </View>
                    </TouchableOpacity>
                  </View>

              })
            }
        </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    // backgroundColor: '#F5FCFF',
    // paddingTop:5,
  },
  songs: {
      padding: 2,
      flex: 1,
      marginLeft:5,
      // flexDirection: 'row',
      flexWrap: 'wrap',
      // justifyContent: 'flex-start'
      // alignItems:'center',
  },
  songname: {
      width: '100%',
      fontSize:16,
  },
  artists: {
      // width: '50%',
      flex: 1,
      flexWrap: 'nowrap',
      flexDirection: 'row'
  },

  artistname: {
      margin: 2,
      fontSize: 13
  },
  albumname: {
      width: '50%',
      fontSize: 13
  },
});
