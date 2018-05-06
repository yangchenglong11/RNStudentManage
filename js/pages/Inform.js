"use strict";

import React, {Component} from "react";

import {View, Image, TextInput, TouchableHighlight, Navigator, ListView, Text} from "react-native";
import {isAndroid, screenScaleWidth} from "../util/system";
import DetailInformPage from "./DetailInform";

const WIDTH = screenScaleWidth;
const HEIGHT = screenScaleWidth;

export default class InformPage extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows(-1))
        };
    }

    _genRows(flag){
        const dataBlob = [];
        for(let i = 0 ; i< 5 ; i ++ ){
            if(i == flag){
                dataBlob.push("公告"+i);
            }else{
                dataBlob.push("公告"+i);
            }
        }
        return dataBlob;
    }

    render() {
        return (
            <ListView
                style={{marginTop: isAndroid() ? HEIGHT(30) : HEIGHT(90)}}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        );
    }
    _renderRow (rowData,sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowData,rowID);
            }}
                                underlayColor='red'
            >
                <View>
                    <View style={styles.row}>
                        <Image style={{width:40,height:40}} source={require('../../images/inform.png')}/>
                        <Text style={{flex:1,height:45,fontSize:27,marginLeft:10,backgroundColor:"#e4e8ff"}}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    _pressRow(rowData,rowID){

        let {navigator} = this.props;
        navigator.push({
            name: "DetailInform",
            component: DetailInformPage,
            config: Navigator.SceneConfigs.PushFromRight
        })
        // alert(rowData);
        // this.setState({dataSource: this.state.dataSource.cloneWithRows(
        //         this._genRows(rowID)
        //     )});
    }

}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fffd',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 3,
    },
};
