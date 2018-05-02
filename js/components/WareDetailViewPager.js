"use strict";

/**
 * 商品展示轮播图
 */
import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import {Images, Utils} from "../resource";
import Swiper from "react-native-swiper";

const SCREEN_WIDTH = Utils.screenWidth();

var TestImages = [
  Images.WareDetailViewPage.page0,
  Images.WareDetailViewPage.page1,
  Images.WareDetailViewPage.page2
];

export default class WareDetailViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      pics: this.props.pics ? this.props.pics : TestImages
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      pics: nextProps.pics !== [] ? nextProps.pics : TestImages
    });
  }

  render() {
    return (
      <Swiper
        key={this.state.key}
        bounces
        height={SCREEN_WIDTH * 0.625}
        dotStyle={{opacity: 0.5}}
        activeDotStyle={{backgroundColor: "#ff4258"}}
        loop={false} >
        {
          this.state.pics.map((page,index) => {
            const src = "data:image/jpg;base64," + page;
            return (
              <TouchableWithoutFeedback key={index} style={styles.slide}>
                <Image source={this.props.pics ? {uri: src} : page} style={styles.page} />
              </TouchableWithoutFeedback>
            );
          })
        }
      </Swiper>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({key: Math.random()});
    },100);
  }
}

const styles = StyleSheet.create({
  page: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.625
  },

  slide: {
    flex: 1,
    backgroundColor: "#ff0000"
  }
});