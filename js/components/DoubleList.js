import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text, Image, View, ListView} from "react-native";
import {Utils} from "../resource";
import * as TestData from "../res/data";

import WareItem from "../components/WareItem";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

export default class DoubleList extends Component {
  constructor(props) {
    super(props);

    var wares = TestData.itemDatas[0].wares;

    this.state = {
      goods: wares,
    }
  }

  componentWillMount(){
    if(this.props.wareList){
      this.setState({
        goods: this.props.wareList
      })
    }
  }

  componentWillReceiveProps(){
    if(this.props.wareList){
      this.setState({
        goods: this.props.wareList
      })
    }
  }

  render() {
    return (
      <View>
        {this._getGoods(this.state.goods)}
      </View>
    );
  }

  _getGoods = (goods) => {
    let {navigator} = this.props;
    var goodsArr = [];
    for (let i = 0; i < goods.length; i++) {
      if (i % 2 == 0) {
        goodsArr.push(
          <View key={i}>
            <View style={{flexDirection: "row"}}>
              <WareItem ware={goods[i]} navigator={navigator} id={goods[i].id} />
              <View style={{height: HEIGHT(500), width: WIDTH(20)}} />
              {(i + 1) >= goods.length ? null :
                <WareItem ware={goods[i + 1]} navigator={navigator} id={goods[i + 1].id} />}
            </View>
            <View style={{height: HEIGHT(20)}} />
          </View>
        )
      }
    }
    return goodsArr;
  };

}
