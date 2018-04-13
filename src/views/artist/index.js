/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import crypto from '../../util/crypto';
 import qs from 'qs';
import React, {Component} from 'react';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class App extends Component < {} > {
    constructor(props) {
        super(props);
        this.state = {
            data: {artist:{},hotAlbums:[],more:false,desc:""}
        };
        console.log(this.state);
    }
    componentDidMount() {
        this.getData();

    }
    async getData() {
        console.log(this.props.navigation);
        let id = this.props.navigation.state.params.id;


        try {
          const cryptoreq = crypto({
            "total": true,
            "offset": 0,
            "limit": 20,
            "csrf_token": ""
          });
            let response = await fetch(`https://music.163.com/weapi/artist/albums/${id}`, {
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
                        })
            },);
            let data = await response.json();
            console.log(data);
            this.setState({data: data});

        } catch (e) {
            console.error(e);
        }
        try {
          const cryptoreq2 = crypto({
            "id":id,
            "csrf_token": ""
          });
            let response = await fetch(`https://music.163.com/weapi/artist/introduction`, {
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
                          "params": cryptoreq2.params,
                          "encSecKey": cryptoreq2.encSecKey
                        })
            },);
            let data = await response.json();
            console.log(data);
            this.setState({desc: data.briefDesc});

        } catch (e) {
            console.error(e);
        }
        return null;
    }
    render() {
        return (<View style={styles.container}>
          <Text style={styles.title}>{this.state.data.artist.name}</Text>
            <ScrollView>
              <View style={styles.info}>
                <ImageBackground
                  style={styles.banner}
                  source={{uri: (this.state.data.artist.picUrl && ((this.state.data.artist.picUrl.replace("http://", "https://")) + `?param=150y150`))}}

                  defaultSource={require('../../assets/disk.png')}
                    >
                  <View style={{width:150,height:30,position:'absolute',top:150,overflow:'hidden'}}>
                  <Image
                    style={{width:150,height:150,position:'absolute',top:0,opacity:0.2,transform:[{rotateX: '180deg'},]}}
                    source={{uri: (this.state.data.artist.picUrl && ((this.state.data.artist.picUrl.replace("http://", "https://")) + `?param=150y150`))}}
                    defaultSource={require('../../assets/disk.png')}
                    >


                  </Image>
                  </View>
                </ImageBackground>
                <View style={{width:185,marginRight:10,marginLeft:10,flex:1,}}>
                  <Text style={styles.time}>专辑数:{this.state.data.artist.albumSize}</Text>
                  <Text style={styles.time}>单曲数:{this.state.data.artist.musicSize}</Text>

                  <Text style={{fontSize:10}}>简介:{this.state.desc}</Text>
                </View>
                </View>

                <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',}}>
                {
                    this.state.data.hotAlbums && this.state.data.hotAlbums.map((li,i) => {
                        return <TouchableOpacity key={li.id} style={{width: 100, height: 100,margin:12}}
                          onPress={() => {
                                 this.props.navigation.navigate('album', {id: li.id})
                             }}
                          >
                        <View style={{width: 100, height: 100,}}  key={li.id+li.name}>
                          <ImageBackground style={{width: 100, height: 100,}}
                            source={{uri: li.picUrl&&(li.picUrl + `?param=100y100`)}}></ImageBackground>
                            <Text style={styles.songname} numberOfLines={1}>{li.name}</Text>
                        </View>
                        </TouchableOpacity>

                    })
                }
                </View>
            </ScrollView>
            <Ionicons
              name={'ios-arrow-back'}
              style={{width:40,position:'absolute',top:5,left:5,}}
              size={24}
              onPress={() => {
                      this.props.navigation.goBack()
                  }}
            />
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    banner: {
        width: 150,
        height: 150
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        // paddingLeft:40,
        marginTop:5,
    },
    songs: {
        width: '100%',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'flex-start'
    },
    songname: {
        width: '100%',
        fontSize:16,
        marginBottom:2,
    },
    artists: {
        width: '99%',
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },

    artistname: {
        margin: 2,
        fontSize: 13
    },
    albumname: {
        width: 1,
        fontSize: 13
    },
    info: {
      width:'100%',
      padding:10,
      flex:1,
      flexWrap: 'nowrap',
      flexDirection: 'row'
    },
    tags: {
        width: '100%',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        flexGrow:0,
        flexShrink:0,
    },
});
