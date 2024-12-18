# 项目修改说明  
By Dream 2024-09-28

--- 
## 目录
<!-- TOC -->
* [项目修改说明](#项目修改说明-)
  * [目录](#目录)
  * [1. 成绩列表  `/grade/list`](#1-成绩列表-gradelist)
    * [1.1 成绩列表 数据列说明](#11-成绩列表-数据列说明)
  * [其他修改](#其他修改)
<!-- TOC -->



---
## 1. 成绩列表  `/grade/list`

[`router/index.js`](src/router/index.js) Line _47_

```js
children:[
    {
        path: '/grade/detail',
        meta: {
            title: '成绩详情'
        },
        component: () => import('@/view/grade/Detail.vue'),
    },
    {
        path: '/grade/list',
           meta: {
               title: '成绩列表'
           },
        component: () => import('@/view/grade/Index.vue'),
    }
]
```
[`permission.js`](src/mock/permission.js) Line _29_ 
```js
menuList:[
    // 添加成绩管理
    {
        title: "成绩管理",
        url: "/grade/list",
        icon: "avatar",
    },
]


export const GradeList = (options) => {
    let hasCondition = true;
    const conditions = JSON.parse(options.body);
    let cameraData = gradeList.filter((item, index) => {
        if (conditions.username) {
            return item.username.includes(conditions.username);
        } else {
            hasCondition = false;
            return index >= (conditions.page - 1) * 10 && index < conditions.page * 10;
        }
    });
    return {
        code: 200,
        data: {
            total: hasCondition ? cameraData.length : gradeList.length,
            gradeList: cameraData,
        },
    };
};


// 成绩数据的修改操作
export const gradeListUpdate = (options) => {
    let obj = JSON.parse(options.body);
    gradeList = gradeList.map((val) => {
        return val.id === obj.id ? obj : val;
    });
    return {
        data: gradeList,
    };
};


export const addGradeList = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    obj.id = Random.id();
    gradeList.unshift(obj); // 将前台返回来的数据，拼接到数组中。
    return {
        data: gradeList,
        id: obj.id,
    };
};

export const getGradeDetail = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    let cameraData = gradeList.filter((item, index) => {
        return item.id === obj;
    });
    return {
        data: cameraData ? cameraData[0] : cameraData,
        id: obj,
    };
};



export const delGrade = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    let cameraData = gradeList.filter((item, index) => {
        return item.id != obj.id;
    });
    return {
        code: 200,
        data: {
            total: cameraData.length,
            gradeList: cameraData,
        },
    };
};
```


[`api/api.js`](src/api/apis.js)  Line 69 
```js
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

```

[`mock/index.js`](src/mock/index.js) Line 29

```js


// 成绩管理
Mock.mock("/permission/addGradeList", "post", addGradeList);
Mock.mock("/permission/gradeListUpdate", "post", gradeListUpdate);
Mock.mock("/permission/gradeDetail", "get", getGradeDetail);
Mock.mock("/permission/GradeList", "get", GradeList);
Mock.mock("/permission/delGrade", "post", delGrade);

```


### 1.1 成绩列表 数据列说明


 - **姓名** 字符串
 - **性别** 
 - **日期** 日期 _(使用日期选择器)_
 - **学科** 字符串
 - **类型** 选项 _(初修/补考/重修)_
 - **成绩** 数字


## 其他修改

 - UserForm.vue 中onSubmit的 listUpdate方法已重命名userListUpdate
