"use strict";

import React, {Component} from "react";

import {View, Image, TextInput, TouchableOpacity, Navigator, ToastAndroid, Text} from "react-native";
import {screenScaleWidth} from "../util/system";

import {isAndroid} from "../util/system";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class MateInfoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdText: "XXX",
            ClassText: "计科1402",
            toastVisible: false,
            errMsg: ""
        };
    }

    componentWillMount() {

    }

    render() {
        let {userName} = this.props;
        return (
            <View style={styles.container}>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>用户名</Text>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>XXX</Text>
                </View>
                <View style={{ flexDirection: "row"}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>班级</Text>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>计科1402</Text>
                </View>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>学号</Text>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>201409020123</Text>
                </View>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>手机</Text>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>18723467531</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        alignItems: "center",
        paddingTop: isAndroid() ? HEIGHT(90) : HEIGHT(102),
        backgroundColor: "#fff"
    },

    loginBtn: {
        height: HEIGHT(90),
        width: WIDTH(652),
        backgroundColor: "#ff4258",
        justifyContent: "center",
        alignItems: "center",
        marginTop: HEIGHT(60),
        marginBottom: HEIGHT(70),
        borderRadius: HEIGHT(6)
    },

    fastLogin: {
        fontSize: 14,
        color: "#999",
        paddingTop: HEIGHT(10)
    },

    weChat: {
        widht: WIDTH(120),
        height: WIDTH(120),
        borderRadius: WIDTH(50),
        borderColor: "#999999",
        borderWidth: 1
    }
};
