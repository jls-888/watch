import Mock from "mockjs";

import {
    UserList,
    addUserList,
    userListUpdate,
    LoginInfo,
    getMenuList,
    getUserDetail,
    delUser,
    deaprtmentSelectData,
    GradeList,
    addGradeList,
    gradeListUpdate,
    getGradeDetail,
    delGrade,
} from "./permission.js";

Mock.mock("/permission/LoginInfo", "post", LoginInfo);
Mock.mock("/permission/getMenuList", "get", getMenuList);
Mock.mock("/permission/UserList", "get", UserList);
Mock.mock("/permission/addUserList", "post", addUserList);
Mock.mock("/permission/userListUpdate", "post", userListUpdate);
Mock.mock("/permission/userDetail", "get", getUserDetail);
Mock.mock("/permission/delUser", "post", delUser);
Mock.mock("/permission/deaprtmentSelectData", "get", deaprtmentSelectData);


// 成绩管理
Mock.mock("/permission/addGradeList", "post", addGradeList);
Mock.mock("/permission/gradeListUpdate", "post", gradeListUpdate);
Mock.mock("/permission/gradeDetail", "get", getGradeDetail);
Mock.mock("/permission/GradeList", "get", GradeList);
Mock.mock("/permission/delGrade", "post", delGrade);


