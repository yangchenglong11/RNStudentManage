"use strict";

import {Platform, Dimensions, ToastAndroid, Alert} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export function isAndroid() {
  return Platform.OS === "android";
}

export function isIOS() {
  return Platform.OS === "ios";
}

export function screenWidth() {
  return SCREEN_WIDTH;
}

export function screenHeight() {
  return SCREEN_HEIGHT;
}

export function screenScaleWidth(scaleWidth) {
  return parseInt(scaleWidth / 720 * SCREEN_WIDTH);
}

export function screenScaleHeight(scaleHeight) {
  return parseInt(scaleHeight / 1280 * SCREEN_HEIGHT);
}

export function message(text, onOk, onCancle) {
  if (isAndroid()) {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  } else if (isIOS()) {
    Alert.alert("通知！", text, [
      {
        text: "Cancel",
        onPress: onCancle
      },
      {
        text: "OK",
        onPress: onOk
      }
    ]
    );
  }
}

export function setPrice(price) {
  var obj = {};
  var dot = String(price).indexOf(".");
  if (dot > 0) {
    var y = String(price).substring(0, dot + 1);
    var x = String(price).substring(dot + 1, String(price).length);
    obj = {
      y, x
    };
  } else {
    obj = {
      y: price,
      x: ""
    };
  }
  return obj;
}

