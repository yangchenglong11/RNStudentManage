"use strict";

import React, {Component} from "react";
import {View, Image, TextInput, TouchableOpacity, Text, Picker, Navigator} from "react-native";
import {screenScaleWidth} from "../util/system";
import {isAndroid} from "../util/system";
import Toast, {DURATION} from 'react-native-easy-toast';
import MyInfoPage from "./MyInfo"
import StudentListPage from "./StudentList"
import InformInfoPage from "./Inform"

import RealmOperation from "../util/realmOperation";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class StudentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdText: "",
            PswText: "",
            Verification: "",
            Selected: ""
        };

        this._onMyInfoBtnClick = this._onMyInfoBtnClick.bind(this);
        this._onMateInfoBtnClick = this._onMateInfoBtnClick.bind(this);
        this._onInformInfoBtnClick = this._onInformInfoBtnClick.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        班级信息管理系统
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>
                        班级 姓名
                    </Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.gridItem}
                        onPress={this._onMyInfoBtnClick}>

                        <Image source={require('../../images/user.png')} style={styles.image}/>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>我的信息</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.gridItem}
                        onPress={this._onMateInfoBtnClick}
                    >
                        <Image source={require('../../images/mate.png')} style={styles.image}/>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>同学信息</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.gridItem}
                        onPress={this._onInformInfoBtnClick}
                    >
                        <Image source={require('../../images/inform.png')} style={styles.image}/>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>我的信息</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.gridItem}
                    >
                        <Image source={require('../../images/grade.png')} style={styles.image}/>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>同学ddddd信息</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onMyInfoBtnClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "MyInfo",
            component: MyInfoPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

    _onMateInfoBtnClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "StudentList",
            component: StudentListPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

    _onInformInfoBtnClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "InformInfo",
            component: InformInfoPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

}

const styles = {
    container: {
        alignItems: "center",
        paddingTop: isAndroid() ? HEIGHT(60) : HEIGHT(80),
        backgroundColor: '#f8f8f8'
    },

    delete: {
        height: HEIGHT(34),
        width: WIDTH(34)
    },

    title: {
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },

    subTitle: {
        justifyContent: 'center',
        fontSize: 18,
        marginBottom: 10,
    },

    row: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    gridItem: {
        height: 250,
        backgroundColor: "#39b5ff",
        width: 250,
        margin: 10,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 180,
        height: 180,
        marginBottom: 20,
    }
};
