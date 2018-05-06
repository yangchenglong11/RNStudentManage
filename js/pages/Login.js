"use strict";

import React, {Component} from "react";

import {View, Image, TextInput, TouchableOpacity, Navigator, ToastAndroid, Text,Picker} from "react-native";
import {screenScaleWidth} from "../util/system";

import {isAndroid} from "../util/system";
import Toast, {DURATION} from 'react-native-easy-toast';

import Input from "../components/Input";
import Logo from "../components/Logo";
import RegisterPage from "./Register";
import StudentMain from "./StudentMain"
import TeacherMain from "./TeacherMain"

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdText: "",
            PswText: "",
            toastVisible: false,
            errMsg: "",
            Selected: "student"
        };
        this._onLoginBtnClick = this._onLoginBtnClick.bind(this);
        this._onIdChange = this._onIdChange.bind(this);
        this._onPswChange = this._onPswChange.bind(this);
        this._onValueChange = this._onValueChange.bind(this);
    }

    componentWillMount() {

    }

    render() {
        let {userName} = this.props;
        return (
            <View style={styles.container}>
                <Logo/>

                <Picker
                    prompt="身份"
                    style={styles.picker}
                    selectedValue={this.state.Selected}
                    onValueChange={(value) => this._onValueChange(value)}>
                    <Picker.Item label="学生" value="student"/>
                    <Picker.Item label="教师" value="teacher"/>
                </Picker>

                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90)}}>
                    <Text style={{fontSize: 14}}>用户名</Text>
                    <Input placeHolder="请输入用户名"
                           onTextChange={(text) => this._onIdChange(text)}
                           type="delete" textContent={this.state.IdText}/>
                </View>
                <View>
                    <Text style={{fontSize: 14}}>密码</Text>
                    <Input placeHolder="请输入密码"
                           onTextChange={(text) => this._onPswChange(text)}
                           type="eye"/>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={this._onRegisterClick} activeOpacity={0.7}>
                            <Text style={{fontSize: 14, color: "#ff4258"}}>立即注册</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.loginBtn}
                    onPress={this._onLoginBtnClick}>
                    <View>
                        <Text style={{fontSize: 17, color: "#fff"}}>登录</Text>
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

        if (this.state.Selected == 'student') {
            let {navigator} = this.props;
            navigator.push({
                name: "StudentMain",
                component: StudentMain,
                config: Navigator.SceneConfigs.PushFromRight
            })
        } else {
            let {navigator} = this.props;
            navigator.push({
                name: "TeacherMain",
                component: TeacherMain,
                config: Navigator.SceneConfigs.PushFromRight
            })
        }


    };

    _onRegisterClick = () => {
        let {navigator} = this.props;
        navigator.push({
            name: "RegisterPage",
            component: RegisterPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
    };

    _onValueChange = (value) => {
        this.setState({Selected:value});

    };

    _onForgetPswClick = () => {
        let {navigator} = this.props;
        /*navigator.push({
            name: "ForgetPswPage",
            component: ForgetPswPage,
            config: Navigator.SceneConfigs.PushFromRight
        })*/
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

    picker: {
        width: 100,
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
