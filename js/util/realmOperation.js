import realm from "./realm";
import HTTP, {getUrl} from "./http";

//user operation

function getCurrentUser() {
  let user = realm.objects("User")[0];
  if (user) {
    return user;
  }
  realm.write(() => {
    realm.create("User", {});
  });
  return realm.objects("User")[0];
}

function getUserFromLocal() {
  return getCurrentUser();
}


function login(userInfo, success, fail) {
  let url = getUrl("user/login");
  HTTP.Post(url, userInfo,
    function (res) {
      if (res.status === 0) {
        getCurrentUser();
        success();
      }
      else if (res.status === 1) {
        fail("号码格式不正确");
      }
      else if (res.status === 2) {
        fail("用户不存在");
      }
      else {
        fail("密码错误");
      }
    },
    function (err) {
      fail("网络繁忙，请稍后再试...");
    }
  );
}

function logout(success) {
  let url = getUrl("user/logout");
  HTTP.Get(url, function () {
    let user = realm.objects("User")[0];
    realm.write(() => {
      user = {};
    });
    success && success();
  });
}

function register(userInfo, success, fail) {
  let url = getUrl("user/register");
  HTTP.Post(url, userInfo,
    function (res) {
      if (res.status === 0) {
        success();
      }
      else if (res.status === 1) {
        fail("号码格式不正确");
      }
      else {
        fail("用户已存在");
      }
    },
    function () {
      fail("网络状况不佳");
    }
  );
}

function getUserFromWeb(success, fail) {
  let _url = getUrl("user/getinfo");
  HTTP.Get(_url,
    function (res) {
      let data = res.data;
      let user = getUserFromLocal();
      realm.write(() => {
        user.avatar = data.avatar;
        user.name = data.name;
        user.sex = data.sex;
      });
      success && success(data);
    },
    function (err) {
      fail && fail();
    }
  );
}

function upLoadAvatar(info, success, fail) {
  let url = getUrl("user/changeavatar");
  HTTP.Post(url, info, success, fail);
}

/*function getPersonalPageFromWeb() {
 let _url = getUrl("ware/showinfo");
 let id = getUserId();
 HTTP.Post(_url, id,
 function (res) {
 realm.write(() => {
 realm.create("Personal", {
 collectionNum: res.data.collectionNum,
 historyNum:  res.data.historyNum,
 favoriteNum:  res.data.favoriteNum,
 wareList:  res.data.wareList,
 }, true);
 });
 },
 function (err) {
 console.log(err)
 }
 )
 }*/

function changeUserInfo(tag, value, success, fail) {
  let url = getUrl("user/changeinfo");
  let info = {};
  info[tag] = value;
  HTTP.Post(url, info, function () {
    let currentUser = getCurrentUser();
    switch (tag) {
      case "name": {
        realm.write(() => {
          currentUser.username = value;
        });
        break;
      }
      case "sex": {
        realm.write(() => {
          currentUser.sex = value;
        });
        break;
      }
      case "phone": {
        realm.write(() => {
          currentUser.phone = value;
        });
        break;
      }
      default:
        return;
    }
    success && success(currentUser.username);
  }, function () {
    fail && fail("请求失败， 请稍后再试...");
  });


}

function getPersonalPageFromLocal() {
  let length = realm.objects("Personal").length;
  return realm.objects("Personal")[length - 1];
}

//adress
function findAdressById(id) {
  let adresses = realm.objects("Adress");
  let cur = {};
  adresses.map(function (adr) {
    if (adr.id === id)
      cur = adr;
  });
  return cur;
}

function addAdress(adressInfo, success, fail) {
  let url = getUrl("address/add");
  HTTP.Post(url, adressInfo, function (res) {
    if (res.status === 0) {
      realm.write(() => {
        let a = realm.create("Adress", {
          receiver: adressInfo.receiver,
          phone: adressInfo.phone,
          id: adressInfo.id.toString(),
          area: adressInfo.area.toString(),
          detailAdress: adressInfo.detailAdress,
          default: adressInfo.default
        });
        let adresses = realm.objects("Adress");
        if (adresses.length === 1)
          a.default = true;
      });
      if (adressInfo.default) {
        setDefaultAdress(adressInfo.id);
      }
      success && success();
    }
  }, function () {
    fail && fail();
  });
}

function updateAdress(adressInfo, success, fail) {
  let url = getUrl("address/change");
  HTTP.Post(url, adressInfo, function () {
    if (adressInfo.default) {
      setDefaultAdress(adressInfo.id);
    }
    let cur = findAdressById(adressInfo.id);
    realm.write(() => {
      cur.receiver = adressInfo.receiver;
      cur.phone = adressInfo.phone;
      cur.area = adressInfo.area;
      cur.detailAdress = adressInfo.detailAdress;
    });
    success && success();
  }, function () {
    fail && fail();
  });
}

function setDefaultAdress(id) {
  let url = getUrl("address/alter");
  HTTP.Post(url, {id: id}, function (res) {
    if (res.status === 0) {
      let adresses = realm.objects("Adress");
      if (adresses.length === 0)
        return;
      let cur = findAdressById(id);
      realm.write(() => {
        for (let i = 0; i < adresses.length; i++) {
          adresses[i].default = false;
        }
        cur.default = true;
      });
    }
  })
}

function getAdress() {
  return realm.objects("Adress");
}

function getAdressFromService() {
  let url = getUrl("address/get");
  HTTP.Get(url, function (res) {
    if (res.status === 0) {
      realm.write(() => {
        res.data.map((adressInfo) => {
          realm.create("Adress", {
            receiver: adressInfo.receiver,
            phone: adressInfo.phone,
            id: adressInfo.id.toString(),
            area: adressInfo.area.toString(),
            detailAdress: adressInfo.detailAdress,
            default: adressInfo.default
          }, true);
        });
      });
    }
  })
}

function deleteAdress(id) {
  let url = getUrl("address/delete");
  HTTP.Post(url, {id: id}, function (res) {
  });
  let cur = findAdressById(id);
  realm.write(() => {
    realm.delete(cur);
  });
}

function getDefaultAdress() {
  let adr = realm.objects("Adress").filtered("default = true");
  return adr[0];
}


//search history:

function addSearchHistory(value) {
  realm.write(() => {
    realm.create("searchHistory", {
      info: value
    });
  });
}

function getSearchHistory() {
  return realm.objects("searchHistory");
}

function deleteSearchHistory() {
  let his = realm.objects("searchHistory");
  realm.write(() => {
    realm.delete(his);
  });
}

function getIndexHomePage(success, fail) {
  let url = getUrl("product/gethomepage");
  HTTP.Get(url, function (res) {
    success(res.data);
  }, function (err) {
    fail && fail(err)
  })
}

function getWareDetail(id, success, fail) {
  let info = {
    id: id
  };
  let url = getUrl("product/getinfo");
  HTTP.Post(url, info, function (res) {
    if (res.status === 0) {
      success && success(res.data);
    }
  }, function (err) {
    fail && fail(err);
  })
}

//shopCart
function addShopCart(info, success, fail) {
  let url = getUrl("carts/create");
  HTTP.Post(url, info, function (res) {
    success && success();
  }, function (err) {
    fail && fail(err);
  })
}

function deleteSingleWare(info, success, fail) {
  let url = getUrl("carts/delete");
  HTTP.Post(url, info, function (res) {
    success && success();
  }, function (err) {
    fail && fail(err);
  });
}

function getShopCart(success, fail) {
  let url = getUrl("carts/getlist");
  HTTP.Get(url, function (res) {
    if (res.status === 0 && res.data) {
      success && success(res.data);
    }
  }, function (err) {
    fail && fail(err);
  })
}

function submitOrder(info, success, fail) {
  let url = getUrl("orders/create");
  HTTP.Post(url, info, function (res) {
      if (res.status === 0) {
        success && success();
      }
    },
    function (err) {
    })
}

function changeWareCount(info) {
  let url = getUrl("carts/alter");
  HTTP.Post(url, info, function (res) {
  })
}

//person

function getPersonPage(success, fail) {
  let url = getUrl("product/getmypage");
  HTTP.Get(url, function (res) {
    if (res.status === 0) {
      success(res.data);
    }
  }, function (err) {
    fail && fail(err)
  })
}


const RealmOperation = {
  //user:
  login,
  logout,
  getUserFromLocal,
  getUserFromWeb,
  changeUserInfo,
  register,
  upLoadAvatar,

  //adress:
  addAdress,
  updateAdress,
  getAdress,
  deleteAdress,
  findAdressById,
  getDefaultAdress,
  getAdressFromService,
  setDefaultAdress,

  //search history:
  addSearchHistory,
  getSearchHistory,
  deleteSearchHistory,

  //ware
  getPersonalPageFromLocal,
  getWareDetail,
  getPersonPage,

  //shopCart
  addShopCart,
  deleteSingleWare,
  getShopCart,
  changeWareCount,

  //order
  submitOrder,

  //homePage
  getIndexHomePage
};

export default RealmOperation;

