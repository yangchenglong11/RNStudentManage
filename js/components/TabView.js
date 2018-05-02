import React, {Component} from "react";
import {
  Animated,
  Platform
} from "react-native";

import {Colors, Utils} from "../resource";
import {TabViewAnimated, TabBar} from "react-native-tab-view";

const SCREEN_WIDTH = Utils.screenWidth();
const initialLayout = {
  height: 0,
  width: SCREEN_WIDTH,
};

export default class TabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index,
      routes: this.props.routes
    }
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderLabel = (props: any) => ({ route, index }) => {
    let {labelStyle} = this.props;
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(inputIndex => inputIndex === index ? "#ff4258" : "#000");
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    });

    return (
      <Animated.Text style={[styles.label, { color }, labelStyle]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderHeader = (props) => {
    let {style, tabStyle, indicatorStyle} = this.props;
    return <TabBar
      {...props}
      pressColor={Colors.FooterBorder}
      renderLabel={this._renderLabel(props)}
      style={[{backgroundColor: "white",elevation: 1},style]}
      tabStyle={tabStyle}
      indicatorStyle={[{backgroundColor: "#ff4258",height: 4},indicatorStyle]}
      labelStyle={{color: Colors.black}}
    />;
  };

  render() {
    let {renderScene} = this.props;
    return(
      <TabViewAnimated
        style={{flex: 1,backgroundColor: Colors.favouriteGrey}}
        navigationState={this.state}
        renderScene={renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        initialLayout={initialLayout}
      />
    )
  }
}

const styles = {
  label: {
    fontSize: (Platform.OS === "ios") ? 15 : 13,
    margin: 8
  }
};