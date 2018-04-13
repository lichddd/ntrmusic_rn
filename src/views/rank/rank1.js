/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import config from '../../config';

export default class App extends Component < {} > {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        console.log(this.state);
    }
    componentDidMount() {
        let list = [];
        config.ranklist.rank1.forEach(async (l) => {
            list.push(Object.assign(l,await this.getData(l)));
            this.setState({list: list});
        });

    }
    async getData(obj) {

        obj.list = [];
        obj.count = 0;

        try {
            let response = await fetch(`https://music.163.com/api/playlist/detail?id=${obj.code}`, {
                method: 'GET',
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
                }
            },);
            let data = await response.json();
            console.log(data);
            obj.picUrl = data.result.coverImgUrl.replace("http://", "https://");
            obj.name = data.result.name;
            obj.list = data.result.tracks.filter((elt, i, arr) => {
                if (i>7) {
                  return false;
                }
                return true;
            });
            obj.time = data.result.trackNumberUpdateTime;
            obj.count = data.result.playCount;
            obj.id=data.result.id;

            return obj;
        } catch (e) {
            console.error(e);
        }

        return null;
    }
    render() {
        return (<ScrollView style={styles.container}>
            {
                this.state.list.map((li) => {
                    return <View key={li.id}>
                        <TouchableOpacity  onPress={() => {this.props.navigation.navigate('playlist', {id:li.id})}}>
                        <ImageBackground style={styles.banner} key={li.code} source={{
                                uri: (li.picUrl + `?param=375y150`)
                            }}>
                            <Text style={styles.time}>{(new Date(li.time)).Format('YYYY年MM月DD日更新')}</Text>
                        </ImageBackground>
                        </TouchableOpacity>
                        {
                            li.list.map((t) => {
                                return <View style={styles.songs} key={t.id} >
                                    <Text style={styles.songname}  numberOfLines={1}  onPress={() => {RCTDeviceEventEmitter.emit("play",t);}}>{t.name}</Text>
                                    {
                                      t.artists.map((a)=>{

                                        return <View style={styles.artists} key={a.id} numberOfLines={1} >

                                                 <Text style={styles.artistname} numberOfLines={1} onPress={() => {this.props.navigation.navigate('artist', {id:a.id})}}>{a.name}</Text>




                                               </View>
                                      })

                                    }

                                </View>
                            })
                        }
                        <Text style={styles.more} onPress={() => {this.props.navigation.navigate('playlist', {id:li.id})}}>查看全部 > </Text>
                    </View>

                })
            }

        </ScrollView>);
    }
}

const styles = StyleSheet.create({
    banner: {
        width: 375,
        height: 150
    },
    songs:{
      width:'100%',
      padding:10,
      flex:1,
      flexDirection: 'row',
      // justifyContent: 'flex-start'
    },
    songname:{
      width:'66%',
    },
    artists:{
      width:'33%',
      flex:1,
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    artistname:{
      margin:2,
      fontSize:10,
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    time: {
        position:'absolute',
        bottom:2,
        left:50,
    },
    more:{
      textAlign:'right',
      marginBottom:5,
      marginRight:10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
