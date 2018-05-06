"use strict";

import React from "react";
import {Navigator, View, BackAndroid, ToastAndroid, StatusBar} from "react-native";
//import Splash from "./pages/Splash";
import {isAndroid} from "./util/system";
import {Styles} from './style/default';
import {Events} from "./util/events";
import MyScene from "./CustomSceneConfigs";
import Login from './pages/login';

export default class FrameWork extends React.Component {
    constructor(props) {
        super(props);

        this.configureScene = this.configureScene.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.onBackAndroid = this.onBackAndroid.bind(this);
    }

    componentWillMount() {
        if (isAndroid()) {
            BackAndroid.addEventListener(Events.Android.HardwareBackPress, this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (isAndroid()) {
            BackAndroid.removeEventListener(Events.Android.HardwareBackPress, this.onBackAndroid);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent
                    barStyle="default"
                    showHideTransition="fade"
                    animated
                    backgroundColor="#000" />
                <Navigator
                    style={{flex: 1}}
                    ref={(nav) => this.navigator = nav}
                    initialRoute={{
                        name: "splash",
                        component: Login
                    }}
                    configureScene={(route, routeStack) => this.configureScene(route, routeStack)}
                    renderScene={this.renderScene} />
            </View>
        );
    }

    renderScene(route, navigator) {
        let Component = route.component;

        /* 传递组件额外属性 */
        if (route.props) {
            return (<Component navigator={navigator} route={route} {...route.props} />);
        }
        return (<Component navigator={navigator} route={route} />);
    }

    configureScene(route) {
        if(route.config) {
            return route.config;
        }
        return MyScene.PushFromRight;
    }

    onBackAndroid() {
        const nav = this.navigator;
        if (nav && nav.getCurrentRoutes().length >= 2) {
            nav.pop();
            return true; //返回 true 表示消费该事件
        }
        if (this.lastBackPressed && this.lastBackPressed + 3000 >= Date.now()) {
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show("exit",ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        return true;
    }
}
