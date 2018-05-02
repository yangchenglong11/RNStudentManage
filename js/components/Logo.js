import React, {Component} from "react";
import {StyleSheet, Image, View} from "react-native";
import {screenScaleWidth} from "../util/system";
import {isAndroid} from "../util/system";

const WIDTH = screenScaleWidth;
const HEIGHT =  screenScaleWidth;


export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <View>
        {
          isAndroid() ?
            <View style={styles.androidLogo}>
              <Image source={require("../../images/LoginPages/androidLogo.png")} style={{height:HEIGHT(250), width:WIDTH(250)}} />
            </View>
            :
            <View style={styles.ioslogo}>
              <Image source={require("../../images/LoginPages/iosLogo.png")} style={{height:HEIGHT(90), width:WIDTH(90)}} />
            </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  ioslogo: {
    width: WIDTH(200),
    height: HEIGHT(200),
    borderRadius: WIDTH(100),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowOffset: {height: 4, width: 4},
    shadowRadius: WIDTH(34),
  },

  androidLogo: {

  },
});
