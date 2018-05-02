"use strict";

import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import {connect} from "react-redux";
import {shopCartWareSelect} from "../actions";

import {Colors, Styles, Utils} from "../resource";

import * as TestData from "../res/data";
import ColumnBlock from "./ColumnBlock";
import ColumnPages from "../pages/ColumnPages";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

class LeftTabListView extends Component {
  constructor(props) {
    super(props);

    this._gotoColumnPages = this._gotoColumnPages.bind(this);
    this.state = {
      selectTag: TestData.itemDatas[0].title,
      selectIndex: 0
    }
  }

  _selected = (ele, index) => {
    this.setState({
      selectIndex: index,
      selectTag: ele,
    });
  };

  _getItem = (itemData) => {
    return (
      <TouchableOpacity style={[Styles.Flex, {marginTop: HEIGHT(30)}, Styles.Center]}>
        <View>
          <Image
            source={itemData.url}
            style={[{width: WIDTH(144), height: HEIGHT(130)}]}
          />
          <Text style={[styles.rightItemText]}>
            {itemData.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _getClassifies = () => {
    var view1 = [];
    var view2 = [];
    for (let i = 0; i < 3; i++) {
      view1.push(this._getItem(TestData.itemDatas[this.state.selectIndex].topItems[i]));
    }

    for (let i = 3; i < 6; i++) {
      view2.push(this._getItem(TestData.itemDatas[this.state.selectIndex].topItems[i]));
    }

    return (
      <View>
        <View style={[Styles.Row, Styles.Center]}>
          {view1}
        </View>

        <View style={[Styles.Row, Styles.Center]}>
          {view2}
        </View>
      </View>
    );
  };

  _getBody = () => {
    return (
      <View style={[styles.rightView]}>
        {this._getClassifies()}
      </View>
    );
  };

  _getfirstView = (classify, t) => {
    var firstView = [];
    for (let i=t; i< t+3; i++){
      let title = classify.secondClassify[i].title;
      firstView.push(
        <ColumnBlock
          key={i}
          style={{width: WIDTH(170),height: HEIGHT(200)}}
          image={require("../../images/ADPages/page3.jpg")}
          imageStyle={styles.imageStyle}
          text={title}
          onPress={() => this._gotoColumnPages(title)}
        />
      );
    };
    return firstView;
  };

  _getSixClassify = (classify) => {
    return (
      <View style={[styles.sixImageSide]}>
        <View style={[styles.firstView, Styles.Center, Styles.Row]}>
          {this._getfirstView(classify, 0)}
        </View>
        <View style={[styles.firstView, Styles.Center, Styles.Row]}>
          {this._getfirstView(classify, 3)}
        </View>
      </View>
    );
  };

  _getBlockItem = (classify) => {
    var classifyItem = [];
    for (let i = 0; i< classify.length; i++){
      classifyItem.push(
        <View key={i} style={styles.classifyBlock}>
          <View style={styles.tittleText}>
            <Text style={styles.bigGrayClassify}>{i ? ("— " + classify[i].title + " —") : ""}</Text>
          </View>
          <View style={[styles.sixImages, Styles.Center]}>
            {this._getSixClassify(classify[i])}
          </View>
        </View>
      );
    };
    return classifyItem;
  };

  _gotoColumnPages = (title) => {
    let {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name: "ColumnPages",
        component: ColumnPages,
        params: {
          title: title,
          isWishList: false
        }
      })
    }
  };

  render() {
    var headItems = [];
    var _scrollView = ScrollView;
    headItems = TestData.itemDatas.map((ele, index) => {
      return (
        <View
          key={index}
          style={{backgroundColor: Colors.classifyGrey}}>
          <TouchableOpacity
            onPress={() => {this._selected(ele.title, index);_scrollView.scrollTo({y:WIDTH(540*index)})}}
            activeOpacity={1}
            style={[styles.headItemTouch, Styles.Flex, Styles.Center, Styles.Row, {
              backgroundColor: (index === this.state.selectIndex ? Colors.white : Colors.classifyGrey),
            }]}>
            <Text style={[styles.bigClassify, {
              color: (index === this.state.selectIndex ? Colors.classifyTextOrange : Colors.black)
            }]}>
              {ele.title}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={[Styles.MainContent, styles.container, Styles.Row]}>
        <ScrollView
          style={[styles.leftScroll]}
          showsVerticalScrollIndicator={false}>
          {headItems}
        </ScrollView>
        <ScrollView
          ref={(ScrollView) => { _scrollView = ScrollView; }}
          style={[styles.rightScroll]}
          showsVerticalScrollIndicator={false} >
          {this._getBlockItem(TestData.itemDatas)}
          <View style={{height: HEIGHT(80)}}></View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },

  leftScroll: {
    height: HEIGHT(1050),
    width: WIDTH(170),
    backgroundColor: Colors.classifyGrey
  },

  rightView: {
    height: HEIGHT(440),
    width: WIDTH(490),
    marginRight: WIDTH(10),
    backgroundColor: Colors.white
  },
  rightItemText: {
    marginTop: HEIGHT(16),
    width: WIDTH(144),
    textAlign: "center"
  },
  itemStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headItemTouch: {
    height: HEIGHT(90)
  },

  rightScroll: {
    height: HEIGHT(990),
    width: WIDTH(534),
    flexDirection: "column",
    backgroundColor: Colors.white
  },

  classifyBlock: {
    width: WIDTH(540),
    height: HEIGHT(540),
    flexDirection: "column"
  },

  sixImages: {
    width: WIDTH(540),
    height: HEIGHT(414)
  },

  sixImageSide: {
    width: WIDTH(540),
    height: HEIGHT(414),
    flexDirection: "column"
  },

  firstView: {
    height: HEIGHT(207)
  },

  imageStyle: {
    width: WIDTH(150),
    height: HEIGHT(150)
  },

  littleClassify: {
    fontSize: 18
  },

  bigClassify: {
    fontSize: 14
  },

  tittleText: {
    width: WIDTH(540),
    height: HEIGHT(126)
  },

  bigGrayClassify: {
    width: WIDTH(540),
    height: WIDTH(36),
    fontSize: 13,
    marginTop: WIDTH(50),
    textAlign: "center"
  }
});

function select(store) {
  return {
    id: store.shopCart.id
  };
}

export default connect(select)(LeftTabListView);