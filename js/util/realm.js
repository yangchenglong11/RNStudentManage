// "use strict";
//
// import Realm from "realm";
//
// class User extends Realm.Object {}
// User.schema = {
//   name: "User",
//   properties: {
//     avatar: {type: "string", default: "", optional: true},
//     username: {type: "string", default: "", optional: true},
//     phone: {type: "string", default: "", optional: true},
//     sex: {type: "int", default: 1, optional: true}
//   }
// };
// class Adress extends Realm.Object {}
// Adress.schema = {
//   name: "Adress",
//   primaryKey: "id",
//   properties: {
//     receiver: {type: "string", default: "", optional: true},
//     phone: {type: "string", default: "", optional: true},
//     id: {type: "string", default: "", optional: true},
//     area: {type: "string", default: "", optional: true},
//     detailAdress: {type: "string", default: "", optional: true},
//     default: {type: "bool", default: false, optional: true}
//   }
// };
//
// class SearchHistory extends Realm.Object {}
// SearchHistory.schema = {
//   name: "searchHistory",
//   properties: {
//     info: "string"
//   }
// };
//
// class SimpleWare extends Realm.Object {}
// SimpleWare.schema = {
//   name: "simpleWare",
//   properties: {
//     img: "string",
//     title: "string",
//     category: "string",
//     price: "string",
//     id: "int"
//   }
// };
//
// class HomePage extends Realm.Object {}
// HomePage.schema = {
//   name: "homePage",
//   properties: {
//     indexPage: {
//       headerPic:  {type: "list", objectType: "string"},
//       wares: {type: "list", objectType: "SimpleWare"},
//     }
//   }
// };
//
//
// export default new Realm({schema: [User, Adress, SearchHistory]});