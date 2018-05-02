"use strict";

import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";
import {Utils, Strings} from "../resource";
import {connect} from "react-redux";

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
    return (
      <View>
        <View style={styles.item}>
          <Image source={require("../../images/ADPages/page2.jpg")} style={styles.img} />
          <View style={styles.description}>
            <Text style={styles.itemName}>{Strings.Example.Ware0}</Text>
            <Text style={{color: "#666666", fontSize:12, height:25}}>
              {Strings.ShopCart.color + "#ff4258" + "  " + Strings.ShopCart.size + "L"}
            </Text>
          </View>
          <View style={styles.payInfo}>
            <Text style={styles.price}>￥30</Text>
            <Text style={styles.number}>x{5}</Text>
          </View>
        </View>
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
    marginRight: WIDTH(30)
  },
  description: {
    width: WIDTH(345)
  },
  itemName: {
    fontSize: 14,
    color: "#000",
    marginBottom: HEIGHT(25)
  },
  price: {
    fontSize: 15,
    color: "#000",
    marginBottom: HEIGHT(15)
  },
  payInfo: {
    alignItems: "flex-end"
  },
  number: {
    fontSize: 14,
    color: "#000"
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
