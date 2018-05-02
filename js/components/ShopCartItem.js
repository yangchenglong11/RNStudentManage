"use strict";

import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import {Utils, Strings} from "../resource";
import {connect} from "react-redux";


import NumControl from "../components/NumControl";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

export default class ShopCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMode : false
    };
  }

  render() {
    let {ele, add, reduce, editorMode, longPress} = this.props;
    return (
      <View>
        <TouchableOpacity onLongPress={() => {longPress(ele)}} activeOpacity={0.85}>
          <View style={styles.item}>
            <Image source={ele.avatar ? {uri: "data:image/jpg;base64," + ele.avatar } : require("../../images/ADPages/page2.jpg")} style={styles.img} />
            <View style={styles.description}>
              <Text style={styles.itemName}>{ele.name ? ele.name : "title"}</Text>
              {
                editorMode ?
                  <NumControl
                    add={add}
                    reduce={reduce}
                    num={ele.num} />
                  :
                  <Text style={styles.text}>
                    {Strings.ShopCart.color}
                    {ele.color ? ele.color : "#ff4258"}
                    {"   "}
                    {Strings.ShopCart.size}
                    {ele.size ? ele.size : "L"}
                  </Text>
              }

            </View>
            <View style={styles.payInfo}>
              <Text style={styles.price}>￥{ele.price ? ele.price : 30}</Text>
              <Text style={styles.number}>x{ele.num ? ele.num : 1}</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    height: HEIGHT(180),
    alignItems: "center"
  },

  img: {
    width: WIDTH(156),
    height: HEIGHT(156),
    marginRight: 5
  },

  description: {
    width: WIDTH(340),
    height: HEIGHT(150),
    justifyContent: "center"
  },

  itemName: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: "#000",
    marginBottom: HEIGHT(25)
  },

  price: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    color: "#000",
    marginBottom: HEIGHT(15)
  },

  payInfo: {
    width: WIDTH(120),
    height: HEIGHT(90),
    alignItems: "center"
  },

  number: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
    color: "#000"
  },

  text: {
    color: "#666666",
    fontSize: Platform.OS === "ios" ? 14 : 12,
    height: 25
  }
});

function select(store) {
  return {
    goods: store.shopCart.goods,
    wareReadyToPay: store.shopCart.selectedWare,
    selectedTab: store.navigation.tab,
    totalPrice: store.shopCart.totalPrice
  };
}
connect(select)(ShopCartItem);
