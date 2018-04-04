/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import crypto from '../../util/crypto';
import qs from 'qs';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

export default class App extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
          show: false,
          uri:"",
      };
      this.player=null;
      console.log(this.state);
  }
  componentDidMount() {
    this.listener=RCTDeviceEventEmitter.addListener("play",(data)=>{

      this.preplay(data.id);

    });

  }
  play(url){



  }
  async preplay(id){


      const cryptoreq = crypto({
        "ids": "[" + id + "]",
        "br": 999000,
        "csrf_token": ""
      });
      // const cryptoreq = {params:"",encSecKey:""};
      try {
          let response = await fetch(`https://music.163.com/weapi/song/enhance/player/url`, {
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
                        "params": cryptoreq.params,
                        "encSecKey": cryptoreq.encSecKey

                        // params:'EKYkiwKyfIxBcIvLCHklQSiuI4uLqnOeQdmcOIhEi8SaQoiRTleyfdiAoBBbVOGQyo6DJFFsQqRt2NKgDlqU29B2ILokWrzMopDq3bzOXlFcRT+mHCEVPp9Nl7XWcaxh',
                        // encSecKey:'c08011be46616aac4d4b9a8e35364784cae28720834b07f08aefc147f902a59a196e4207b6de54f7edcd3213ad39fbb9d3a00026bbb2770cc9faae14bb06e493b38b997f91ae5d83495fee4b208ccb172c67d38a6ae5b05d2eb53b0baad79324ef6d316b4fda9e82d5105d11650efce207effedfaa3016649a202005e19d3e67'

                      })
          });
          let data = await response.json();
          console.log(data);
          this.setState({uri:data.data[0].url.replace("http://", "https://")});
          // this.play(data.data[0].url.replace("http://", "https://"));
      } catch (e) {
          console.error(e);
      }



  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
        onPress={()=>{this.setState({show:!this.state.show})}}
         style={{width:'100%',height:50,display:this.state.show?'flex':'none'}}
        >
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{this.setState({show:!this.state.show})}}
            style={{width:'100%',height:200,display:this.state.show?'none':'flex'}}
          >
            <Video source={this.state.uri?{uri: this.state.uri}:require('../../assets/default.mp3')}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}
       rate={1.0}                              // 0 is paused, 1 is normal.
              volume={1.0}                            // 0 is muted, 1 is normal.
              muted={false}                           // Mutes the audio entirely.
              paused={false}                          // Pauses playback entirely.
              resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
              repeat={true}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)

              style={styles.backgroundVideo}

     />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',

    position:'absolute',
    bottom:0,
    width:'100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundVideo: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},
});
