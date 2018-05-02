// "use strict";
//
// import React, {Component} from "react";
// import {
//   Container,
//   Text,
// } from "native-base";
// import {View, Image, TextInput, TouchableOpacity} from "react-native";
// import {Utils, Strings} from "../resource";
// import {isAndroid} from "../util/system";
// import Toast, {DURATION} from 'react-native-easy-toast';
//
// import Input from '../components/Input';
// import Logo from '../components/Logo';
// import {
//   register
// } from "../actions"
// import RealmOperation from "../util/realmOperation";
//
//
// const WIDTH = Utils.screenScaleWidth;
// const HEIGHT = Utils.screenScaleWidth;
//
// export default class RegisterPage extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       IdText: "",
//       PswText: "",
//       Verification: ""
//     };
//
//     this._onRegisterBtnClick = this._onRegisterBtnClick.bind(this);
//     this._onIdChange = this._onIdChange.bind(this);
//     this._onPswChange = this._onPswChange.bind(this);
//     this._onVerificationChange = this._onVerificationChange.bind(this);
//   }
//
//   render() {
//     return (
//       <Container style={styles.container}>
//         <Logo />
//         <View style={{marginTop:isAndroid()? HEIGHT(30): HEIGHT(90)}}>
//           <Text style={{fontSize:14}}>{Strings.Personal.RegisterPage.userId}</Text>
//           <Input placeHolder={Strings.Personal.RegisterPage.userIdPlaceHolder}
//                  onTextChange={(text) => this._onIdChange(text)} type="delete" />
//         </View>
//
//         <View>
//           <Text style={{fontSize:14}}>{Strings.Personal.RegisterPage.confirm}</Text>
//           <Input placeHolder={Strings.Personal.RegisterPage.confirmPlaceHolder}
//                  onTextChange={(text) => this._onVerificationChange(text)}
//                  disabled={this.state.IdText === ""} type="confirm" />
//         </View>
//
//         <View>
//           <Text style={{fontSize:14}}>{Strings.Personal.RegisterPage.psw}</Text>
//           <Input placeHolder={Strings.Personal.RegisterPage.pswPlaceholder}
//                  onTextChange={(text) => this._onPswChange(text)} type="eye"/>
//
//           <TouchableOpacity style={{flexDirection:"row",justifyContent:"flex-end"}}
//                             onPress={this._onLoginBtnClick} activeOpacity={0.7}>
//             <Text style={{fontSize:14, color:'#ff4258'}}>{Strings.Personal.RegisterPage.loginNow}</Text>
//           </TouchableOpacity>
//         </View>
//         <View>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.loginBtn}
//             onPress={this._onRegisterBtnClick}>
//             <View>
//               <Text style={{fontSize:17,color:'#ffffff'}}>{Strings.Personal.RegisterPage.register}</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//
//         <Toast ref="toast"
//                fadeInDuration={1000}
//                fadeOutDuration={1500}
//                opacity={0.8} />
//       </Container>
//     )
//   }
//
//   _onRegisterBtnClick = () => {
//     if(this.state.PswText === ""){
//       this.refs.toast.show("手机号不能为空",DURATION.LENGTH_LONG);
//       return
//     }
//     if(this.state.PswText.length < 6){
//       this.refs.toast.show("密码长度不小于 6 位",DURATION.LENGTH_LONG);
//       return
//     }
//     let _registerSuceess = ()=> {
//       //this.props.dispatch(login());
//       let {navigator} = this.props;
//       navigator.pop();
//     };
//
//     let _registerFaliled = (err) => {
//       this.refs.toast.show(err,DURATION.LENGTH_LONG);
//     };
//
//     let personalInfo = {
//      mobile:this.state.IdText,
//      password:this.state.PswText
//      };
//
//     RealmOperation.register(personalInfo, _registerSuceess, _registerFaliled);
//   };
//
//   _onLoginBtnClick = () => {
//     let {navigator} = this.props;
//     navigator.pop();
//   };
//
//   _onIdChange = (text) => {
//     this.setState({IdText: text});
//   };
//
//   _onPswChange = (text) => {
//     this.setState({PswText: text});
//   };
//
//   _onVerificationChange = (text) => {
//     this.setState({Verification: text});
//   }
//
// }
//
// const styles = {
//   container: {
//     alignItems: "center",
//     paddingTop:isAndroid()? HEIGHT(90): HEIGHT(102),
//     backgroundColor:'#f8f8f8'
//   },
//
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: "#efefef",
//     width: WIDTH(608),
//     height: HEIGHT(76),
//     borderRadius: WIDTH(6),
//     marginTop: HEIGHT(20),
//     marginBottom: HEIGHT(30),
//     paddingLeft: WIDTH(24),
//     paddingRight: WIDTH(24)
//   },
//
//   delete: {
//     height: HEIGHT(34),
//     width: WIDTH(34)
//   },
//
//   loginBtn: {
//     height: HEIGHT(90),
//     width: WIDTH(652),
//     backgroundColor: "#ff4258",
//     justifyContent: "center",
//     alignItems: 'center',
//     marginTop: HEIGHT(50),
//     marginBottom: HEIGHT(70),
//     borderRadius: HEIGHT(6)
//   }
// };
