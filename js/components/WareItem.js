"use strict";
import React, {Component} from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import {connect} from "react-redux";

import {Colors, Styles, Utils} from "../resource";
import WareDetailPage from "../pages/WareDetailPage";
import {setDetailPageId} from "../actions";


const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

class WareItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.selectWare = this.selectWare.bind(this);
  }

  render() {
    let {ware} = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.selectWare(ware.id)}>
        <View style={styles.container}>
          {
            ware ?
            <Image
              source={{uri: "data:image/jpg;base64,"+ ware.img}}
              style={styles.productImg}
            /> :
            <View style={[styles.productImg,{backgroundColor: Colors.FooterBorder}]}/>
          }
          <View style={styles.information}>
            <Text style={[styles.name]}>{ware ? ware.title : "WareName"}</Text>
            <Text style={[styles.name,styles.detail]}>{ware ? ware.category : "WareDetail"}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>￥</Text>
            <Text style={styles.price}>{ware ? Utils.setPrice(ware.price).y : 0}</Text>
            <Text style={styles.priceDec}>{ware ? Utils.setPrice(ware.price).x : 0}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  selectWare = (id) => {
    let {navigator} = this.props;
    this.props.dispatch(setDetailPageId(id));
    navigator.push({
      name: "WareDetailPage",
      component: WareDetailPage
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 0,
    paddingBottom: 5,
    borderRadius: 4,
    borderColor: "#efefef",
    borderWidth: 1,
    width: WIDTH(328),
    height: HEIGHT(510)
  },

  detail: {
    color: Colors.InputColor,
    paddingTop: HEIGHT(8),
    fontSize: (Platform.OS === "ios") ? 14 : 12
  },

  productImg: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: WIDTH(324),
    height: HEIGHT(320)
  },

  information: {
    height: HEIGHT(118),
    width: WIDTH(324),
    backgroundColor: Colors.white
  },

  name: {
    paddingTop: HEIGHT(10),
    marginHorizontal: WIDTH(20),
    fontSize: (Platform.OS === "ios") ? 15 : 13,
    color: Colors.black
  },

  priceContainer: {
    paddingLeft: WIDTH(20),
    width: WIDTH(324),
    height: HEIGHT(50),
    flexDirection: "row",
    alignItems: "center"
  },

  price: {
    color: Colors.priceRed,
    fontSize: (Platform.OS === "ios") ? 16 : 14,
    marginTop: HEIGHT(8)
  },

  priceDec: {
    color: Colors.priceRed,
    marginTop: HEIGHT(12),
    fontSize: (Platform.OS === "ios") ?  14 : 12,
  }
});

export default connect()(WareItem);
