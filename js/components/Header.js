import React, {Component} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  Icon,
  Button
} from "native-base";

import {Colors, Utils} from "../resource";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleHeight;

export default class Header extends Component {
  render() {
    let {style, iconLeft, iconRight, image, text, title, textStyle} = this.props;
    return (
      <View style={[styles.header,style]} >
        <View style={styles.view}>
        {
          iconLeft ?
          <Button transparent style={styles.button} onPress={this.props.onPressLeft} >
            <Icon name={iconLeft} style={styles.icon} />
          </Button> :
          null
        }
        </View>
        <Text style={[styles.text,textStyle]}>{title}</Text>
        <View style={styles.view}>
        {
          iconRight ?
          <Button transparent style={styles.button} onPress={this.props.onPressRight} >
            <Icon name={iconRight} style={styles.icon} />
          </Button> :
          null
        }
        {
          image ?
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={this.props.onPressRight} >
            <Image source={image} style={styles.image} />
          </TouchableOpacity> :
          null
        }
        {
          text ?
          <Button transparent style={styles.button} onPress={this.props.onPressRight} >
            <Text style={styles.view}>{text}</Text>
          </Button> :
          null
        }
        </View>
      </View>
    );
  }
}

const styles = {
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.FooterBorder
  },

  icon: {
    color: Colors.InputColor,
    width: 25
  },

  button: {
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    color: Colors.black,
    fontSize: (Platform.OS === "ios") ? 18 : 16
  },

  image: {
    height: HEIGHT(48),
    width: WIDTH(48)
  },

  view: {
    width: 50
  }
};