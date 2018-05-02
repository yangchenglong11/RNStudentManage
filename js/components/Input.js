import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text, TextInput, Image, View} from "react-native";
import {screenScaleWidth} from "../util/system";
import Strings from '../res/zh_CN/string'

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      eyeOpen: false,
      textShow: true,
      verificationGetting: false,
      leftTime: 60
    };

    this._onClearBtnClick = this._onClearBtnClick.bind(this);
    this._onFetchVerificationClick = this._onFetchVerificationClick.bind(this);
  }

  componentWillMount(){
    this.setState({
      text: this.props.textContent,
    })
  }

  componentWillUnmount(){
    this.timer0 && clearInterval(this.timer0);
    this.timer1 && clearTimeout(this.timer1);
  }

  render() {
    let {placeHolder, onTextChange, type} = this.props;
    return (
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder={placeHolder}
                   placeholderTextColor="#b2b2b2"
                   underlineColorAndroid="transparent"
                   secureTextEntry={type==="eye"? this.state.textShow: false}
                   onChangeText={(text) => {
                     onTextChange(text);
                     this.setState({text: text})
                   }}
                   value={this.state.text} />
        {
          this.badge(type)
        }
      </View>
    );
  }

  input = (type) => {
    switch (type) {
      case "password":
        return (
          <TextInput style={styles.textInput} placeholder={placeHolder}
                     placeholderTextColor="#b2b2b2"
                     underlineColorAndroid="transparent"
                     secureTextEntry={true}
                     onChangeText={(text) => {
                     onTextChange(text);
                     this.setState({text: text})
                   }}
                     value={this.state.text} />
        );
      default:
        return (
          <TextInput style={styles.textInput} placeholder={placeHolder}
                     placeholderTextColor="#b2b2b2"
                     underlineColorAndroid="transparent"
                     secureTextEntry={type === "eye" ? this.state.textShow : false}
                     onChangeText={(text) => {
                     onTextChange(text);
                     this.setState({text: text})
                   }}
                     value={this.state.text} />
        )
    }
  };

  badge = (type) => {
    switch (type) {
      case "delete":
        return (
          this.state.text === "" ? null :
            <TouchableOpacity onPress={this._onClearBtnClick}>
              <Image source={require("../../images/LoginPages/delete.png")} style={styles.delete} />
            </TouchableOpacity>
        );
      case "eye":
        return (
          this.state.eyeOpen ?
            <TouchableOpacity onPress={() => {this._onEyeBtnClick()}} activeOpacity={1}>
              <Image source={require("../../images/LoginPages/eyeOpen.png")} style={styles.eye} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => {this._onEyeBtnClick()}} activeOpacity={1}>
              <Image source={require("../../images/LoginPages/eyeClose.png")} style={styles.eye} />
            </TouchableOpacity>
        );
      case "confirm":
        return (
          this.state.verificationGetting ?
            <Text style={styles.text}>|  {Strings.Input.wait} {this.state.leftTime} {Strings.Input.second}</Text>
            :
            <TouchableOpacity onPress={this._onFetchVerificationClick}
                              disabled={this.props.disabled}
                              activeOpacity={1}>
              <Text style={this.props.disabled? {color:"#b2b2b2"}: {color:"#000"}}>|  {Strings.Input.get}</Text>
            </TouchableOpacity>
        )
    }
  };

  _onClearBtnClick() {
    this.setState({text: ""})
  };

  _onEyeBtnClick() {
    this.setState({
      eyeOpen: !this.state.eyeOpen,
      textShow: !this.state.textShow
    })
  };

  _onFetchVerificationClick() {
    this.setState({
      verificationGetting: true
    });

    this.timer0 = setInterval(() => {
      this.setState({
        leftTime: this.state.leftTime - 1
      })
    }, 1000);

    this.timer1 = setTimeout(
      () => {
        this.setState({
          verificationGetting: false
        });
        clearInterval(this.timer0)
      }, 60 * 1000)
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#efefef",
    width: WIDTH(608),
    height: HEIGHT(76),
    borderRadius: WIDTH(6),
    marginTop: HEIGHT(20),
    marginBottom: HEIGHT(30),
    paddingLeft: WIDTH(20),
    paddingRight: WIDTH(24)
  },

  textInput: {
    width: WIDTH(420),
    height: HEIGHT(76),
    fontSize: 15,
    paddingBottom: HEIGHT(18)
  },

  delete: {
    height: HEIGHT(34),
    width: WIDTH(34)
  },

  eye: {
    height: HEIGHT(38),
    width: WIDTH(38)
  },

  text: {
    color: "#b2b2b2",
  }
});
