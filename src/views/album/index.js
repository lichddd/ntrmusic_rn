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
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class App extends Component < {} > {
    constructor(props) {
        super(props);
        this.state = {
            data: {album:{},songs:[]}
        };
        console.log(this.state);
    }
    componentDidMount() {
        this.getData();

    }
    async getData() {
        console.log(this.props.navigation);
        let id = this.props.navigation.state.params.id;
            //
            // axios.post('music163/weapi/v1/album/' + this.$route.params.id,
            //
            //   qs.stringify({
            //     "params": cryptoreq.params,
            //     "encSecKey": cryptoreq.encSecKey
            //   })
            //
            // ).then(m => {
            //   if (m.status == 200 && m.data.code == 200) {
            //     this.albumdata = m.data.album;
            //     this.albumdata.songs=m.data.songs;
            //     this.$nextTick(() => {
            //
            //
            //       if (this.$el.getElementsByClassName("desc")[0].offsetHeight > 40) {
            //         this.isexpend = true;
            //       } else {
            //         this.isexpend = false;
            //       }
            //
            //
            //
            //
            //     })
            //   }
            //
            //   console.log(m)
            // });

        try {
            const cryptoreq = crypto({
              "csrf_token": ""
            });
            let response = await fetch(`https://music.163.com/weapi/v1/album/${id}`, {
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

        return null;
    }
    render() {
        return (<View style={styles.container}>
          <Text style={styles.title}>{this.state.data.album.name}</Text>
            <ScrollView>
              <View style={styles.info}>
                <ImageBackground
                  style={styles.banner}
                  source={{uri: (this.state.data.album.picUrl && ((this.state.data.album.picUrl.replace("http://", "https://")) + `?param=150y150`))}}

                  defaultSource={require('../../assets/disk.png')}
                    >
                  <View style={{width:150,height:30,position:'absolute',top:150,overflow:'hidden'}}>
                  <Image
                    style={{width:150,height:150,position:'absolute',top:0,opacity:0.2,transform:[{rotateX: '180deg'},]}}
                    source={{uri: (this.state.data.album.picUrl && ((this.state.data.album.picUrl.replace("http://", "https://")) + `?param=150y150`))}}
                    defaultSource={require('../../assets/disk.png')}
                    >


                  </Image>
                  </View>
                </ImageBackground>
                <View style={{width:185,marginRight:10,marginLeft:10,flex:1,}}>

                  <View style={{flex:0,flexDirection: 'row'}}><Text style={styles.time}>歌手:</Text>
                  {
                    this.state.data.album.artists&&this.state.data.album.artists.map((a) => {
                        return <View style={styles.artists} key={a.id+a.name} numberOfLines={1}>

                            <Text style={styles.artistname} numberOfLines={1} onPress={() => {
                                    this.props.navigation.navigate('artist', {id: a.id})
                                }}>{a.name}</Text>

                        </View>
                    })

                  }
                  </View>
                  <Text style={styles.time}>{(new Date(this.state.data.album.publishTime)).Format('发行时间:YYYY年MM月DD日')}</Text>
                  {/* <View style={styles.tags}>
                    <Text>标签:</Text>{this.state.data.album.tags&&this.state.data.album.tags.map((a) => {
                            return <Text key={a} onPress={() => {
                                        this.props.navigation.navigate('allplaylist', {id: a})
                                    }}>{a}</Text>})
                    }
                  </View> */}
                  <Text style={{fontSize:10}}>简介:{this.state.data.album.description}</Text>
                </View>

                </View>

                {
                    this.state.data.songs && this.state.data.songs.map((li,i) => {
                        return <View style={[styles.songs,i%2?{}:{backgroundColor:'#f4f4f4'}]}  key={li.id+li.name}>
                            <Text style={styles.songname} numberOfLines={1} onPress={() => {
                                    // this.props.navigation.navigate('song', {id: li.id})
                                    RCTDeviceEventEmitter.emit("play",li);
                                }}>{li.name}</Text>
                            <Text style={styles.albumname} numberOfLines={1} onPress={() => {
                                    this.props.navigation.navigate('album', {id: li.album.id})
                                }}>{li.album && li.album.name}</Text>
                            {
                                li.ar.map((a) => {
                                    return <View style={styles.artists} key={a.id+a.name} numberOfLines={1}>

                                        <Text style={styles.artistname} numberOfLines={1} onPress={() => {
                                                this.props.navigation.navigate('artist', {id: a.id})
                                            }}>{a.name}</Text>

                                    </View>
                                })

                            }
                        </View>

                    })
                }

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
