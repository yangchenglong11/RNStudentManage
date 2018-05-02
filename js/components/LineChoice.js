"use strict";

import React, {Component} from "react";
import {
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {screenHeight} from "../util/system";
import {Colors, Images} from "../resource";

const ITEM_HEIGHT = screenHeight() / 12;

export default class LineChoice extends Component {
  constructor(props) {
    super(props);

    this.viewStyle = {
      height: ITEM_HEIGHT,
      backgroundColor: props.background ? props.background : Colors.white,
      flexDirection: "row",
      alignItems:"center",
    };

    this.touchStyle = {
      marginTop: parseInt(props.top ? props.top : 0), // eslint-disable-line no-magic-numbers
    };

    this.textStyle = {
      flex: 1,
      marginLeft: 4, // eslint-disable-line no-magic-numbers
      color: Colors.black,
      fontSize: 16, // eslint-disable-line no-magic-numbers
    };

    this.iconSize = ITEM_HEIGHT * 0.5;
    this.nextIconSize = ITEM_HEIGHT * 0.4;
  }

  render() {
    if(!this.props.noRight) {
      return(
        <TouchableHighlight style={this.touchStyle} onPress={() => this.props.onClick()} >
          <View style={this.viewStyle}>
            <Icon name={this.props.icon} size={this.iconSize} color={Colors.black} style={{marginLeft: 8}} />
            <Text style={this.textStyle}>{this.props.text}</Text>
            <Icon name={Images.Common.Next} size={this.nextIconSize} color={Colors.black} style={{marginRight: 8}} />
          </View>
        </TouchableHighlight>
      );
    }

    return(
      <TouchableHighlight style={this.touchStyle} onPress={() => this.props.onClick()}>
        <View style={this.viewStyle}>
          <Icon name={this.props.icon} size={this.iconSize} color={Colors.black} style={{marginLeft: 8}} />
          <Text style={this.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

