"use strict";

/**
 * 广告轮播
 */
import React, {Component} from "react";
import {
  StyleSheet,
  Image,
  View
} from "react-native";
import {Images, Utils} from "../resource";
import Swiper from "./Swiper";

const SCREEN_WIDTH = Utils.screenWidth();

var TestImages = [
  Images.ADViewPage.page0,
  Images.ADViewPage.page1,
  Images.ADViewPage.page2,
  Images.ADViewPage.page3,
  Images.ADViewPage.page4
];

export default class AdViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      adPics: TestImages
    };
  }

  componentWillMount(){
    this.setState({
      adPics: this.props.adPics ? this.props.adPics : TestImages
    });
  }

  componentWillReceiveProps(){
    this.setState({
      adPics: this.props.adPics ? this.props.adPics : TestImages
    });
  }


  render() {
    return (
      <Swiper
        key={this.state.key}
        loadMinimal
        loadMinimalSize={5}
        height={SCREEN_WIDTH * 2 / 5}
        dotStyle={{opacity: 0.5}}
        paginationStyle={{bottom: 5}}
        activeDotStyle={{backgroundColor: "#ff4258"}}
        loop
        autoplay
        autoplayTimeout={2} >
        {
          this.state.adPics.map((page,index) => {
            return (
              <View key={index} style={styles.slide}>
                  <Image source={{uri: "data:image/jpg;base64," + page.img}} style={styles.page} />
              </View>
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
    height: SCREEN_WIDTH * 2 / 5
  },

  slide: {
    flex: 1,
  }
});