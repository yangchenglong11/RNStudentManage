"use strict";

const favoriteBlack = "#323232";
const favoriteGrey = "#efefef";
const favoriteYellow = "#cbb86d";
const fontGrey = "#939393";

const TRANSPARENT = "rgba(0,0,0,0)";

export const Color = {
  white: "#ffffff",
  black: "#000000",
  grey: fontGrey,
  favouriteGrey: "#efefef",
  red: "#ff0000",
  iconGrey: "#333333",
  yellow: "#ffff00",
  blue: "#0000ff",
  green: "#00ff00",
  lightPink: "#FFB6C1",
  crimson: "#DC143C",
  violet: "#EE82EE",
  indigo: "#4B0082",
  skyBlue: "#87CEEB",
  lightCyan: "#E1FFFF",
  turquoise: "#40E0D0",
  orange: "#ff7f24",

  FontColor: "#666666",

  //主页
  BorderColor: "#999999",
  SearchBarBG: "#f5f5f5",
  InputColor: "#666666",
  TabActiveText: "#ff4258",

  //商品详情页
  priceRed: "#e62129",
  BlockBorder: "#cccccc",
  FooterBorder: "#e1e1e1",

  //分类页
  classifyGrey: "#efefef",
  classifyTextOrange: "#ff4258",

  //我的
  personalOrange: "#fc8e24",

  transparent: TRANSPARENT,

  // 底部导航
  tabTextFocused: favoriteYellow,

  // 背景色
  Background: {
    Common: favoriteBlack,
    Tab: favoriteGrey,
    Category: favoriteGrey,
    Office: favoriteGrey,
    Setting: favoriteGrey,
    ArticleList: favoriteGrey,
    WareStyle: "#f2f2f2",
    WebView: favoriteGrey,
    Button:"#ff4258"
  },

  // StoryBoard
  StoryBoard: {
    Title: "#ffffff",
    Yellow: "#bec166",
    Green: "#5fb374",
    Blue: "#7eb7d1"
  },

  // Setting
  Setting: {
    PersonalCardBackground: favoriteBlack
  }
};
