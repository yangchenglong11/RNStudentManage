"use strict";

import React, {Component} from "react";

import {View, Image, TextInput, TouchableHighlight, Navigator, ListView, Text} from "react-native";
import {screenScaleWidth} from "../util/system";
import MateInfoPage from "./MateInfo";


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
                dataBlob.push("学生"+i);
            }else{
                dataBlob.push("学生"+i);
            }
        }
        return dataBlob;
    }

    render() {
        return (
            <ListView
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
                        <Image style={{width:40,height:40}} source={require('../../images/splash.jpg')}/>
                        <Text style={{flex:1,fontSize:20,marginLeft:20}}>
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
            name: "MateInfo",
            component: MateInfoPage,
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
        backgroundColor: '#F5FCFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
    },
};
