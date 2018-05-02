import React, {Component} from "react";
import {TouchableOpacity, Text, View} from "react-native";
import {Utils, Colors, Strings} from "../resource";
import {isAndroid} from "../util/system";

import CheckBox from "./Check";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

export default class AdressItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {adressInfo, deleteAdress, editAdress, setDefault} = this.props;
    return (
      <View style={styles.listRow}>
        <View style={styles.adressDetail}>
          <View style={styles.nameAndPhone}>
            <Text>{adressInfo.receiver}</Text>
            <Text>{adressInfo.phone}</Text>
          </View>
          <Text>{adressInfo.area+adressInfo.detailAdress}</Text>
        </View>

        <View style={styles.editView}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <CheckBox checked={adressInfo.default} onChange={setDefault} />
            <Text>{Strings.Personal.PersonalInfoPage.defaultAdress}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => {editAdress(adressInfo.id)}}>
              <Text style={{marginRight:WIDTH(50)}}>{Strings.Personal.PersonalInfoPage.edit}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{deleteAdress()}}>
              <Text style={{marginRight:WIDTH(30)}}>{Strings.Personal.PersonalInfoPage.delete}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: HEIGHT(10)
  },

  title: {
    color: "#3a3a3a",
    marginLeft: isAndroid() ? WIDTH(110) : 0,
    width: 100
  },

  listRow: {
    alignItems: "center",
    width: WIDTH(720),
    backgroundColor: Colors.white,
    marginTop: HEIGHT(10),
    borderBottomWidth :0.5,
    borderBottomColor:"#efefef",
    borderTopWidth :0.5,
    borderTopColor:"#efefef"
  },

  adressDetail: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    width: WIDTH(720),
    height:HEIGHT(140),
    paddingVertical: WIDTH(20),
    paddingHorizontal: WIDTH(30)
  },

  nameAndPhone: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom:HEIGHT(20)
  },

  editView: {
    width:WIDTH(720),
    height:HEIGHT(70),
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center"
  }
};

