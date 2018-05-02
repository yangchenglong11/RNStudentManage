"use strict";
import {Platform} from "react-native";
import {Color} from "../colors";
import {screenWidth, screenHeight, isAndroid, screenScaleHeight} from "../../util/system";
const WindowWidth = screenWidth();
const WindowHeight = screenHeight();

const HEIGHT = screenScaleHeight;

const HEAD_HEIGHT = HEIGHT(128);
const FOOTER_HEIGHT = HEIGHT(98);

export const Style = {
  Center: {
    justifyContent: "center",
    alignItems: "center"
  },
  Row: {
    flexDirection: "row"
  },
  Window: {
    width: WindowWidth,
    height: WindowHeight
  },
  WidthUseWindow: {
    width: WindowWidth
  },
  Flex: {
    flex: 1
  },
  FlexColumn: {
    flex: 1,
    flexDirection: "column",
  },
  ImageFullScreen: {
    flex: 1,
    width: WindowWidth,
    height: 1
  },

  MainContent: {
    height: WindowHeight - FOOTER_HEIGHT
  },

  // 通用配置
  Common: {
    BackContainer: {
      width: 96,
      backgroundColor: Color.transparent,
      justifyContent: "flex-start",
    },

    Back: {
      color: Color.white,
      size: 40
    },

    CloseContainer: {
      width: 96,
      backgroundColor: Color.transparent,
      justifyContent: "flex-end",
    },

    Close: {
      color: Color.white,
      size: 40
    }
  },

  BackgroundPage: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.classifyGrey
  },

  WhiteBG: {
    flex: 1,
    backgroundColor: Color.white
  },

  // Splash
  SplashText: {
    flex: 1,
    fontSize: (Platform.OS === "ios") ? 16 : 13,
    textAlign: "center",
    color: Color.black,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: "transparent",
  },

  // Header
  Header: {
    height: HEAD_HEIGHT,
    backgroundColor: Color.Background.Common
  },

  HeaderTitle: {
    fontSize: 20,
    color: Color.white
  },

  // Tab
  Tab: {
    height: FOOTER_HEIGHT,
    backgroundColor: Color.Background.Common
  },

  TabIcon: {
    height: HEIGHT(44),
    width: HEIGHT(44),
    marginBottom: (Platform.OS === "ios") ? 0 : -3
  },

  TabTitle: {
    color: Color.iconGrey,
    fontSize: HEIGHT(22),
    marginBottom: 5
  },

  TabTitleFocused: {
    color: Color.red,
    fontSize: HEIGHT(22),
    marginBottom: 5
  },

  // WebView
  WebView: {
    height: WindowHeight - HEAD_HEIGHT
  },

  //ShopHome
  ShopHomeTab: {
    height: HEIGHT(60),
    backgroundColor: Color.white,
  },

  //Personal
  LoginButton: {
    height:isAndroid()? 70:80,
    width: isAndroid()? 70:80,
    borderRadius:isAndroid()? 35:40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
    marginLeft: isAndroid()?WindowWidth / 2 - 55:WindowWidth / 2 - 60,
    marginTop:isAndroid()?12:0,
  }
};
