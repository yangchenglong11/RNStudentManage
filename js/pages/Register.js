"use strict";

import React, {Component} from "react";
import {View, Image, TextInput, TouchableOpacity, Text} from "react-native";
import {screenScaleWidth} from "../util/system";
import {isAndroid} from "../util/system";
import Toast, {DURATION} from 'react-native-easy-toast';
import Check from '../components/Check';
import Input from '../components/Input';
import Logo from '../components/Logo';

import RealmOperation from "../util/realmOperation";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IdText: "",
            PswText: "",
            Verification: "",
            Identity: ""
        };

        this._onRegisterBtnClick = this._onRegisterBtnClick.bind(this);
        this._onIdChange = this._onIdChange.bind(this);
        this._onPswChange = this._onPswChange.bind(this);
        this._onIdentityChange = this._onIdentityChange.bind(this);
        this._onVerificationChange = this._onVerificationChange.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo/>

                <View>
                    <Check/>
                    <Text>教师</Text>
                </View>
                <View>
                    <Check/>
                    <Text>学生</Text>
                </View>

                <View style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90)}}>
                    <Text style={{fontSize: 14}}>用户名</Text>
                    <Input placeHolder="请输入用户名"
                           onTextChange={(text) => this._onIdChange(text)} type="delete"/>
                </View>

                <View>
                    <Text style={{fontSize: 14}}>密码</Text>
                    <Input placeHolder="请输入密码"
                           onTextChange={(text) => this._onPswChange(text)} type="eye"/>

                    <TouchableOpacity style={{flexDirection: "row", justifyContent: "flex-end"}}
                                      onPress={this._onLoginBtnClick} activeOpacity={0.7}>
                        <Text style={{fontSize: 14, color: '#ff4258'}}>立即登录</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.loginBtn}
                        onPress={this._onRegisterBtnClick}>
                        <View>
                            <Text style={{fontSize: 17, color: '#ffffff'}}>注册</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Toast ref="toast"
                       fadeInDuration={1000}
                       fadeOutDuration={1500}
                       opacity={0.8}/>
            </View>
        )
    }

    _onRegisterBtnClick = () => {
        if (this.state.PswText === "") {
            this.refs.toast.show("手机号不能为空", DURATION.LENGTH_LONG);
            return
        }
        if (this.state.PswText.length < 6) {
            this.refs.toast.show("密码长度不小于 6 位", DURATION.LENGTH_LONG);
            return
        }
        let _registerSuceess = () => {
            //this.props.dispatch(login());
            let {navigator} = this.props;
            navigator.pop();
        };

        let _registerFaliled = (err) => {
            this.refs.toast.show(err, DURATION.LENGTH_LONG);
        };

        let personalInfo = {
            mobile: this.state.IdText,
            password: this.state.PswText
        };

        RealmOperation.register(personalInfo, _registerSuceess, _registerFaliled);
    };

    _onLoginBtnClick = () => {
        let {navigator} = this.props;
        navigator.pop();
    };

    _onIdChange = (text) => {
        this.setState({IdText: text});
    };

    _onPswChange = (text) => {
        this.setState({PswText: text});
    };

    _onIdentityChange = (text) => {
        this.setState({Identity: text});
    };

    _onVerificationChange = (text) => {
        this.setState({Verification: text});
    }

}

const styles = {
    container: {
        alignItems: "center",
        paddingTop: isAndroid() ? HEIGHT(90) : HEIGHT(102),
        backgroundColor: '#f8f8f8',
        flexDirection: 'column'
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

    loginBtn: {
        height: HEIGHT(90),
        width: WIDTH(652),
        backgroundColor: "#ff4258",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: HEIGHT(50),
        marginBottom: HEIGHT(70),
        borderRadius: HEIGHT(6)
    }
};
