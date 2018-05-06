"use strict";

import React, {Component} from "react";

import {View, Image, TextInput, TouchableOpacity, Navigator, ToastAndroid, Text} from "react-native";
import {screenScaleWidth} from "../util/system";

import {isAndroid} from "../util/system";
import Toast, {DURATION} from 'react-native-easy-toast';

import Input from "../components/Input";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class MyInfoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdText: "小红",
            ClassText: "计科1402",
            toastVisible: false,
            stuNumber: "201409020125",
            phone:"18723434532",
            errMsg: ""
        };
        this._onLoginBtnClick = this._onLoginBtnClick.bind(this);
        this._onIdChange = this._onIdChange.bind(this);
        this._onPswChange = this._onPswChange.bind(this);
    }

    componentWillMount() {

    }

    render() {
        let {userName} = this.props;
        return (
            <View style={styles.container}>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>用户名</Text>
                    <Input placeHolder="小红"
                           style = {{width:40}}
                           onTextChange={(text) => this._onIdChange(text)}
                           type="delete" textContent={this.state.IdText}/>
                </View>
                <View style={{ flexDirection: "row"}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>班级</Text>
                    <Input placeHolder={this.state.ClassText}
                           onTextChange={(text) => this._onIdChange(text)}
                           type="delete" textContent={this.state.ClassText}/>
                </View>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>学号</Text>
                    <Input placeHolder={this.state.stuNumber}
                           style = {{width:40}}
                           onTextChange={(text) => this._onIdChange(text)}
                           type="delete" textContent={this.state.stuNumber}/>
                </View>
                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90), flexDirection: "row",}}>
                    <Text style={{fontSize: 15, textAlignVertical:"center"}}>手机</Text>
                    <Input placeHolder={this.state.phone}
                           style = {{width:40}}
                           onTextChange={(text) => this._onIdChange(text)}
                           type="delete" textContent={this.state.phone}/>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={this._onLoginBtnClick}>
                    <View>
                        <Text style={{fontSize: 17, color: "#fff"}}>保存</Text>
                    </View>
                </TouchableOpacity>

                <Toast ref="toast"
                       fadeInDuration={1000}
                       fadeOutDuration={1500}
                       opacity={0.8}/>

            </View>
        )
    }

    _onLoginBtnClick() {
        if (this.state.ClassText.length < 6 || this.state.ClassText.length > 64) {
            this.refs.toast.show("密码长度不小于6位", DURATION.LENGTH_LONG);
            return
        }

        let _loginSuceess = () => {
            this.refs.toast.show('success', DURATION.LENGTH_LONG);
        };

        let _loginFaliled = (err) => {
            this.refs.toast.show(err, DURATION.LENGTH_LONG);
        };

        let personalInfo = {
            mobile: this.state.IdText,
            password: this.state.ClassText
        };

    };

    _onIdChange = (text) => {
        this.setState({IdText: text});
    };

    _onPswChange = (text) => {
        this.setState({ClassText: text});
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


function select(store) {
    return {
        logged: store.user.logged
    }
}
