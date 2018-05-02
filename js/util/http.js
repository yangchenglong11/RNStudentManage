"use strict";

function requestByGet(url, onSucceed, onFailure) {
  //console.log("Get " + url + " started.");

  fetch(url, { // eslint-disable-line no-undef
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }})
    .then((resp) => resp.json())
    .then((json) => {
      //console.log("Get Succeed for " + url + ", response:" + JSON.stringify(json));

      onSucceed(json);
    })
    .catch((err) => {
      //console.error("Get failed for " + url + ", error:" + err);

      onFailure(err);
    });
}

function requestByPost(url, params, onSucceed, onFailure) {
  fetch(url, { // eslint-disable-line no-undef
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)})
    .then((resp) => resp.json())
    .then((json) => {
      //console.log("Post succeed for " + url + ", response:" + JSON.stringify(json));

      onSucceed && onSucceed(json);
    })
    .catch((err) => {
     // console.error("Post failed for " + url + ", error:" + err);

      onFailure && onFailure(err);
    });
}

export function getUrl(route) {
  return "http://192.168.43.57:17071/api/v1/" + route;
}

const HTTP = {
  Get: requestByGet,
  Post: requestByPost
};

export default HTTP;
