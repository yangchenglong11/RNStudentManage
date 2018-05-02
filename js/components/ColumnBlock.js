import React, {Component} from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform
} from "react-native";

import {Colors, Utils} from "../resource";

const HEIGHT = Utils.screenScaleHeight;

var Touchable = Platform.select({
  ios: () => require("TouchableOpacity"),
  android: () => require("TouchableNativeFeedback"),
})();

export default class ColumnBlock extends Component {

  render() {
    let {style, image, imageStyle, text, textStyle} = this.props;
    return(
      <Touchable
        activeOpacity={0.8}
        onPress={this.props.onPress}>
        <View style={[styles.block,style]}>
          {image ? <Image source={image} style={[styles.icon,imageStyle]} /> : null}
          {text ? <Text style={[{fontSize: (Platform.OS === "ios") ? 13 : 11,color: "black"},textStyle]}>{text}</Text> : null}
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    height: HEIGHT(164),
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.SearchBarBG
  },

  icon: {
    width: HEIGHT(70),
    height: HEIGHT(70),
    marginBottom: 5
  }
});