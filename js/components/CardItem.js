import React, {Component} from "react";
import {StyleSheet, Text, Image, View} from "react-native";
import {Utils, Strings} from "../resource";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.renderView = this.renderView.bind(this);
  }

  render() {
    let {cardState} = this.props;
    return (
      <View>
        {this.renderView(cardState)}
      </View>
    );
  }

  renderView(cardState) {
    switch (cardState) {
      case "valid":
        return (
          <View style={styles.cardItem}>
            <View style={styles.left}>
              <Text style={styles.description}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.durationText}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
            <View style={[styles.right,{backgroundColor:"#ff4258"}]}>
              <Text style={styles.disCount}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.cardDetail}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
          </View>
        );
      case "used":
        return (
          <View style={styles.cardItem}>
            <Image source={require("../../images/peraonalPage/used.png")} style={styles.used} />
            <View style={styles.left}>
              <Text style={styles.description}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.durationText}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
            <View style={[styles.right]}>
              <Text style={styles.disCount}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.cardDetail}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
          </View>
        );
      case "invalid":
        return (
          <View style={styles.cardItem}>
            <View style={styles.left}>
              <Text style={styles.description}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.durationText}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.disCount}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
              <Text style={styles.cardDetail}>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
            </View>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  cardItem: {
    width: WIDTH(660),
    height: HEIGHT(150),
    marginTop: HEIGHT(20),
    flexDirection: "row",
    borderRadius: WIDTH(14),
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  used: {
    width: WIDTH(120),
    height: HEIGHT(120),
    position: "absolute",
    left: WIDTH(420),
    top: HEIGHT(18),
    zIndex: 3
  },

  left: {
    flex: 3,
    paddingLeft: WIDTH(30),
    justifyContent: "center"
  },

  description: {
    fontSize: 14,
    marginBottom: HEIGHT(10),
    color: "#000"
  },

  durationText: {
    fontSize: 10,
    color: "#999"
  },

  right: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: WIDTH(30),
    borderTopRightRadius: WIDTH(14),
    borderBottomRightRadius: WIDTH(14)
  },

  disCount: {
    fontSize: 20,
    color: "#fff"
  },

  cardDetail: {
    color: "#fff",
    fontSize: 11,
  }
});
