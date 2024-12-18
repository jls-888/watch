//src/api/user/index.js

import service from "./request.js";

export function LoginInfo(query) {
  return service({
    method: "POST",
    url: "/permission/LoginInfo",
    data: query,
  });
}
export function getMenuList(query) {
  return service({
    method: "get",
    url: "/permission/getMenuList",
    data: query,
  });
}

export function getUserList(query) {
  return service({
    method: "get",
    url: "/permission/UserList",
    data: query,
  });
}

export function getUserDetail(query) {
  return service({
    method: "get",
    url: "/permission/userDetail",
    data: query,
  });
}

export function addUserList(query) {
  return service({
    method: "post",
    url: "/permission/addUserList",
    data: query,
  });
}

export function delUser(query) {
  return service({
    method: "post",
    url: "/permission/delUser",
    data: query,
  });
}

export function userListUpdate(query) {
  return service({
    method: "post",
    url: "/permission/userListUpdate",
    data: query,
  });
}

export function deaprtmentSelectData(query) {
  return service({
    method: "get",
    url: "/permission/deaprtmentSelectData",
    data: query,
  });
}


// 新增成绩管理部分API

export function getGradeList(query) {
  return service({
    method: "get",
    url: "/permission/GradeList",
    data: query,
  });
}

export function gradeListUpdate(query) {
  return service({
    method: "post",
    url: "/permission/gradeListUpdate",
    data: query,
  });
}
export function addGradeList(query) {
  return service({
    method: "post",
    url: "/permission/addGradeList",
    data: query,
  });
}

export function getGradeDetail(query) {
  return service({
    method: "get",
    url: "/permission/gradeDetail",
    data: query,
  });
}