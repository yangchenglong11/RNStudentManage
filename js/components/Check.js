import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Image, View} from "react-native";
import {Icon} from "native-base";
import {Utils,} from "../util/system";

const WIDTH = Utils.screenScaleWidth;
const HEIGHT = Utils.screenScaleWidth;

export default class Check extends Component {
  static defaultProps = {
    checked: false
  };
  static propTypes = {
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onChangeState: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    })
  }

  toggle() {
    this.setState({checked: !this.state.checked},
      () => {
        this.props.onChangeState&&this.props.onChangeState(this.state.checked);
        this.props.onChange&&this.props.onChange();
    });
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} ref="checkbox" onPress={this.toggle.bind(this)}>
        <View style={styles.checkBox}>
          {
            this.state.checked ?
              <Icon name="ios-checkmark-circle" style={{color:"#ff4258",fontSize:24}} />
              :
              <View
                style={styles.unSelect} />
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  checkBox: {
    marginHorizontal: WIDTH(30)
  },

  unSelect: {
    width: WIDTH(40),
    height: HEIGHT(40),
    marginTop:HEIGHT(4),
    marginBottom:HEIGHT(4),
    borderRadius: WIDTH(22),
    borderColor: "#999",
    borderWidth: 1,
    backgroundColor: "#fff"
  }
});

