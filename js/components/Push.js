"use strict"

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  LayoutAnimation,
  Dimensions,
  Text,
  Image
} from "react-native";

//import Gift from "../pages/Gift";
import Animation from "lottie-react-native";

import {Colors, NativeBaseTheme, Styles, Strings, Images, Config, Utils} from "../resource";
const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleHeight;
const SCREEN_WIDTH = Utils.screenWidth();
const SCREEN_HEIGHT = Utils.screenHeight();

let self;
/**ref的引用*/
const PULL_REFRESH_LAYOUT="pullLayout";
/**屏幕宽度*/
const deviceWidth = Dimensions.get("window").width;
/**下拉阻力系数*/
const factor=1;
/**最大下拉高度*/
const MAX_PULL_LENGTH=500;
/**Loading的高度*/
const REFRESH_PULL_LENGTH=300;
/**动画时长*/
const BACK_TIME=400;

const RefreshStatus={
  Refresh_NONE:0,
  Refresh_Drag_Down:1,
  Refresh_Loading:2,
  Refresh_Reset:3,
};

const ShowLoadingStatus={
  SHOW_DOWN:0,
  SHOW_UP:1,
  SHOW_LOADING:2,
};

class PullToRefreshLayout extends Component{

  _panResponder: {};
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      currentDistance:0,

      pullRefreshStatus:RefreshStatus.Refresh_NONE,

      showPullStatus:ShowLoadingStatus.SHOW_DOWN,
    };
    this.resetHeader=this.resetHeader.bind(this);
    this.refreshStateHeader=this.refreshStateHeader.bind(this);
  }

  //要求成为响应者
  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return false;
  }
  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    /*if (gestureState.y0 < HEIGHT(100) && (Math.abs(gestureState.dy) > 0 || Math.abs(gestureState.vy) > 0))
      return true;*/
    return false;
  }
  //touch down 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  _handlePanResponderGrant(e: Object, gestureState: Object){

  }

  //touch move 响应滑动事件
  _handlePanResponderMove(e: Object, gestureState: Object) {
    if(self.state.currentDistance>REFRESH_PULL_LENGTH){
      if(self.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
        self.setState({
          showPullStatus:ShowLoadingStatus.SHOW_UP,
        });
      }
    }
    else{
      if (self.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
        self.setState({
          showPullStatus:ShowLoadingStatus.SHOW_DOWN,
        });
      }
    }
    if (self.state.pullRefreshStatus===RefreshStatus.Refresh_Loading){
      self.setState({
        currentDistance:REFRESH_PULL_LENGTH+gestureState.dy/factor,
        // refreshStateHeader:2,
      });
      self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
        style:{
          marginTop:self.state.currentDistance,
        }
      });
      return;
    }
    if (gestureState.dy>0&&self.state.currentDistance<MAX_PULL_LENGTH){
      self.setState({
        currentDistance:gestureState.dy/factor,
        pullRefreshStatus:RefreshStatus.Refresh_Drag_Down,
      });
      self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
        style:{
          marginTop:self.state.currentDistance,
        }
      });
    }
    else if(gestureState.dy>0&&self.state.currentDistance>MAX_PULL_LENGTH){//则不再往下移动
      self.setState({
        currentDistance:MAX_PULL_LENGTH,
        pullRefreshStatus:RefreshStatus.Refresh_Drag_Down,
      });
      self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
        style:{
          marginTop:self.state.currentDistance,
        }
      });
    }
  }


  resetHeader(){
    LayoutAnimation.configureNext({
      duration: BACK_TIME,
      update: {
        type: "linear",
      }
    });
    self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
      style:{
        marginTop:0,
      }
    });
    self.setState({
      currentDistance:0,
      pullRefreshStatus:RefreshStatus.Refresh_Reset,
      showPullStatus:ShowLoadingStatus.SHOW_DOWN,
    });
  }

  refreshStateHeader(){
    self.setState({
      pullRefreshStatus:RefreshStatus.Refresh_Loading,
      currentDistance:REFRESH_PULL_LENGTH,
      showPullStatus:ShowLoadingStatus.SHOW_LOADING,
    },()=>{
      if(self.props.onRefresh){
        self.props.onRefresh();
      }
    });
    LayoutAnimation.configureNext({
      duration: BACK_TIME,
      update: {
        type: "linear",
      }
    });
    self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
      style:{
        marginTop:REFRESH_PULL_LENGTH,
      }
    });
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    if (self.state.currentDistance>=REFRESH_PULL_LENGTH){
      self.refreshStateHeader();
    }
    else{
      self.resetHeader();
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    self=this;
    this._panResponder=PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (nextState.showPullStatus!==self.state.showPullStatus){
      return true;
    }
    return false;
  }

  render(){
    let pullText;
    let indicatorView;
    if (this.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
      indicatorView=<View style={{width: deviceWidth,height: 500}}/>;
      //pullText="下拉刷新";
    }
    else if (this.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
      indicatorView=<View style={{width: deviceWidth,height: 500}}/>;
      //pullText="释放刷新";
    }
    else if(this.state.showPullStatus===ShowLoadingStatus.SHOW_LOADING){
      indicatorView=<View style={{width: deviceWidth,height: 500}}/>;
      //pullText="刷新中......";
    }
    return (
      <View style={styles.base}>
        <View style={{backgroundColor:"transparent",position:"absolute",}}>
          <View style={{justifyContent:"center",alignItems:"center",width:SCREEN_WIDTH,height:REFRESH_PULL_LENGTH}}>
            {indicatorView}
          </View>
        </View>
        <View
          ref={PULL_REFRESH_LAYOUT}
          style={{flex:1,position:"absolute"}}  {...this._panResponder.panHandlers} >
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default PullToRefreshLayout;

var styles = StyleSheet.create({
  base: {
    flex: 1,
    position :"relative"
  },
});