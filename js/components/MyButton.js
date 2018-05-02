import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {Styles} from "../resource";

export default class MyButton extends Component {

  render() {
    let {style, icon, iconSize, iconColor, title, titleStyle} = this.props;
    return (
      <TouchableOpacity
        style={[Styles.Center, Styles.Flex, style]}
        onPress={this.props.onClick}>
        {icon ? <Icon name={icon} size={iconSize} color={iconColor ? iconColor : null} /> : null}
        {title ? <Text style={[styles.text, titleStyle]}>{title}</Text> : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12
  }
});
