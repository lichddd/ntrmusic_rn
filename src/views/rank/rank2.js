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
    Image,
    ImageBackground,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
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
        config.ranklist.rank2.forEach(async (l) => {
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
          <View  style={styles.container_view}>
            {
                this.state.list.map((li) => {
                    return <View key={li.id}>
                      <TouchableOpacity
                       onPress={() => {this.props.navigation.navigate('playlist', {id:li.id})}}>
                        <ImageBackground style={styles.banner} key={li.id} source={{
                                uri: li.picUrl&&(li.picUrl + `?param=150y150`)
                            }}
                            >
                            <Text style={styles.count}>{('🎵'+Math.ceil(li.count/10000)+'万')}</Text>
                        </ImageBackground>
                      </TouchableOpacity>
                          </View>

                })
            }
        </View>
        </ScrollView>);
    }
}

const styles = StyleSheet.create({
    banner: {
        width: 150,
        height: 150,
        margin:18.75,
    },

    container: {
      // width:375,
      // padding:10,
    },
    container_view:{
      flexDirection:'row',//主轴方向,水平
      alignItems:'flex-start',//定义控件在侧轴上的对齐方式
      flexWrap:'wrap',//是否换行
      backgroundColor: '#F5FCFF'
    },
    count: {
        position:'absolute',
        top:2,
        right:5,
        color:'#ffffff',
        textShadowColor:'#000000',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius:5,
    },

});
