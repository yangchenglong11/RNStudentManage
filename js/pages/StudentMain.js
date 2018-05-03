"use strict";

import React, {Component} from "react";
import {View, Image, TextInput, TouchableOpacity, Text, Picker, Navigator} from "react-native";
import {screenScaleWidth} from "../util/system";
import {isAndroid} from "../util/system";
import Toast, {DURATION} from 'react-native-easy-toast';
import PersonInfoPage from "./PersonInfo"
import Input from '../components/Input';

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
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',
                }}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={this._onMyInfoBtnClick}
                  >
                    <View>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>我的信息</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={this._onMateInfoBtnClick}
                >
                    <View>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>同学信息</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                >
                    <View>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>公告</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                >
                    <View>
                        <Text style={{fontSize: 17, color: '#ffffff'}}>班级信息</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    _onMyInfoBtnClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "PersonInfo",
            component: PersonInfoPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

    _onMateInfoBtnClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "PersonInfo",
            component: PersonInfoPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

}

const styles = {
    container: {
        alignItems: "center",
        paddingTop: isAndroid() ? HEIGHT(90) : HEIGHT(102),
        backgroundColor: '#f8f8f8'
    },

    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#efefef",
        width: WIDTH(608),
        height: HEIGHT(76),
        borderRadius: WIDTH(6),
        marginTop: HEIGHT(20),
        marginBottom: HEIGHT(30),
        paddingLeft: WIDTH(24),
        paddingRight: WIDTH(24)
    },

    delete: {
        height: HEIGHT(34),
        width: WIDTH(34)
    },

    picker: {
        width: 100,
    },

    loginBtn: {
        height: HEIGHT(80),
        backgroundColor: "#ff4258",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: HEIGHT(30),
        marginBottom: HEIGHT(1),
        borderRadius: HEIGHT(6)
    }
};
