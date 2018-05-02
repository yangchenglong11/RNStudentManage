import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import {Styles, Colors} from "../resource";

export default class NumControl extends Component {

  render() {
    let {num, add, reduce} = this.props;
    return (
      <View style={[styles.container, Styles.Center, styles.border]}>
        <TouchableOpacity disabled={num === 1} onPress={() => reduce()} style={[{flex: 1}, Styles.Center]}>
          <Text style={[styles.touchText, {color: num === 0 ? Colors.grey : null}]}>{"-"}</Text>
        </TouchableOpacity>

        <View style={[{height: 25, width: 40}, Styles.Center, styles.border]}>
          <Text>{num}</Text>
        </View>

        <TouchableOpacity onPress={() => add()} style={[{flex: 1}, Styles.Center]}>
          <Text style={styles.touchText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 100,
    height: 25,
    borderRadius: 4
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.favouriteGrey
  },
  touchText: {
    fontSize: 20
  }
};