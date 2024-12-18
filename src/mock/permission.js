// 引入mockjs
import Mock from "mockjs";
import {listToTree} from '@/utils/index.js'

const Random = Mock.Random;

let menuList = [
    {
        title: "首页",
        url: "/index",
        icon: "house",
    },
    {
        title: "品牌管理",
        url: "/user/list",
        icon: "avatar",
    },
// 添加成绩管理
    {
        title: "经典系列",
        url: "/grade/list",
        icon: "Sell",
    },

    {
        title: "系统公告",
        url: "/index",
        icon: "BellFilled",
    },
];

export const LoginInfo = (options) => {
    console.log(options, "接收post参数");
    const {username, password} = JSON.parse(options.body);
    if (username != "admin" || password != "123456") {
        return {
            code: "-200",
            data: {
                message: "用户不存在",
            },
        };
    } else {
        return {
            code: "200",
            data: {},
        };
    }
};

export const getMenuList = (options) => {
    const obj = JSON.parse(options.body);
    return {
        code: 200,
        data: {
            menuList: menuList,
        },
    };
};

// 用户列表
let userList = [
    {
        id: '1',
        username: '百达翡丽',
        birthday: '1839',
        age: 185,
        email: 'www.patek.com',
        date: '2024-2-24',
        address: '瑞士',
        hobby: '永恒的价值从不消逝',
        work: '顶级腕表',

        department: '1',
        content: '',
        isValid: true,
    },
    {
        id: '2',
        username: '爱彼',
        birthday: '1875',
        age: 149,
        email: 'www.audemarspiguet.com',
        date: '2024-3-15',
        address: '瑞士',
        hobby: '独一无二的精密设计，彰显个人品味',
        work: '运动风格腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '3',
        username: '江诗丹顿',
        birthday: '1755',
        age: 269,
        email: 'www.vacheron-constantin.com',
        date: '2024-4-16',
        address: '瑞士日内瓦',
        hobby: '你可以轻易地拥有时间，但无法轻易地拥有江诗丹顿',
        work: '顶级奢华腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '4',
        username: '宝玑',
        birthday: '1775',
        age: 249,
        email: 'www.breguet.com',
        date: '2024-5-18',
        address: '法国巴黎',
        hobby: '于历史寻求突破，以创新引领卓越',
        work: '顶级腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '5',
        username: '积家',
        birthday: '1833',
        age: 191,
        email: 'www.jaeger-lecoultre.cn',
        date: '2024-5-20',
        address: '瑞士汝拉山古',
        hobby: '时光无限，爱抵永恒',
        work: '高端定制表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '6',
        username: '劳力士',
        birthday: '1905',
        age: 119,
        email: 'www.rolex.com',
        date: '2024-6-24',
        address: '英国伦敦',
        hobby: '一个劳力士，一个故事',
        work: '顶级奢华腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '7',
        username: '卡地亚',
        birthday: '1847',
        age: 177,
        email: 'www.cartier.cn',
        date: '2024-7-1',
        address: '法国巴黎',
        hobby: '以时光之名，许一生之诺',
        work: '顶级奢侈腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '8',
        username: '欧米茄',
        birthday: '1848',
        age: 176,
        email: 'www.omegawatches.cn',
        date: '2024-8-15',
        address: '瑞士拉绍德封',
        hobby: '静让世界暂停，动让时间前行',
        work: '高端腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '9',
        username: '朗格',
        birthday: '1845',
        age: 179,
        email: 'www.alange-soehne.com',
        date: '2024-8-20',
        address: '德国',
        hobby: '为完美而生，为卓越而驰骋',
        work: '顶级奢侈腕表',

        department: '8',
        content: '',
        isValid: false,
    },
    {
        id: '10',
        username: '宇舶',
        birthday: '1980',
        age: 44,
        email: 'www.hublot.com',
        date: '2024-9-18',
        address: '瑞士',
        hobby: '融合的艺术',
        work: '高端奢侈腕表',

        department: '8',
        content: '',
        isValid: false,
    }
];

export const UserList = (options) => {
    let hasCondition = true;
    const conditions = JSON.parse(options.body);
    let cameraData = userList.filter((item, index) => {
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
            total: hasCondition ? cameraData.length : userList.length,
            userList: cameraData,
        },
    };
};

export const getUserDetail = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    let cameraData = userList.filter((item, index) => {
        return item.id == obj;
    });
    if (cameraData) {
        cameraData.forEach((item) => {
            departmentList.forEach((a) => {
                if (a.id == item.department) {
                    cameraData[0].department = a.departName;
                }
            })
        });
    }
    return {
        data: cameraData ? cameraData[0] : cameraData,
        id: obj,
    };
};

export const addUserList = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    obj.id = Random.id();
    userList.unshift(obj); // 将前台返回来的数据，拼接到数组中。
    return {
        data: userList,
        id: obj.id,
    };
};

export const delUser = (options) => {
    console.log("传过来的数据" + JSON.parse(options.body));
    let obj = JSON.parse(options.body);
    let cameraData = userList.filter((item, index) => {
        return item.id != obj.id;
    });
    return {
        code: 200,
        data: {
            total: cameraData.length,
            userList: cameraData,
        },
    };
};

// 用户数据的修改操作
export const userListUpdate = (options) => {
    let obj = JSON.parse(options.body);
    userList = userList.map((val) => {
        return val.id == obj.id ? obj : val;
    });
    return {
        data: userList,
    };
};

let departmentList = [
    {
        id: '1',
        departName: '百达翡丽',
        parentId: '',
        num: '01',
        type: '级腕表',
        sort: 1,
        tel: '13889608690',
        address: '瑞士',
        remark: '百达翡丽'
    },
    {
        id: '2',
        departName: '爱彼',
        parentId: '',
        num: '02',
        type: '运动风格腕表',
        sort: 2,
        tel: '18741125017',
        address: '瑞士',
        remark: '爱彼'
    },
    {
        id: '3',
        departName: '江诗丹顿',
        parentId: '',
        num: '03',
        type: '顶级奢华腕表',
        sort: 3,
        tel: '13245879981',
        address: '瑞士日内瓦',
        remark: '江诗丹顿'
    },
    {
        id: '4',
        departName: '宝玑',
        parentId: '1',
        num: '04',
        type: '顶级腕表',
        sort: 1,
        tel: '13867223097',
        address: '法国巴黎',
        remark: '宝玑'
    },
    {
        id: '5',
        departName: '积家',
        parentId: '1',
        num: '05',
        type: '高端定制表',
        sort: 2,
        tel: '18755612390',
        address: '瑞士汝拉山古',
        remark: '积家'
    },
    {
        id: '6',
        departName: '劳力士',
        parentId: '2',
        num: '06',
        type: '顶级奢华腕表',
        sort: 1,
        tel: '13788977734',
        address: '英国伦敦',
        remark: '劳力士'
    },
    {
        id: '7',
        departName: '卡地亚',
        parentId: '2',
        num: '07',
        type: '顶级奢侈腕表',
        sort: 2,
        tel: '18277654531',
        address: '法国巴黎',
        remark: '卡地亚'
    },
    {
        id: '8',
        departName: '欧米茄',
        parentId: '2',
        num: '08',
        type: '高端腕表',
        sort: 3,
        tel: '13833009327',
        address: '瑞士绍拉德封',
        remark: '欧米茄'
    },
    {
        id: '9',
        departName: '朗格',
        parentId: '3',
        num: '09',
        type: '顶级奢侈腕表',
        sort: 1,
        tel: '15988321118',
        address: '德国',
        remark: '朗格'
    },
    {
        id: '10',
        departName: '宇舶',
        parentId: '3',
        num: '10',
        type: '高端奢侈腕表',
        sort: 2,
        tel: '13240087728',
        address: '瑞士',
        remark: '宇舶'
    }
];

export const deaprtmentSelectData = () => {
    const treeData = [];
    departmentList.forEach((item) => {
        let d = {};
        d.value = item.id;
        d.id = item.id;
        d.label = item.departName;
        d.parentId = item.parentId;
        treeData.push(d);
    });
    return {
        code: 200,
        data: {
            departmentSelectData: listToTree(treeData),
        },
    };
};


// Dream Add Grade List

// 说明
// {
//   id: 1, 序号 唯一值
//   name:'', 姓名
//   sex: 1, 性别 (男=1,女=2)
//   date:'', 日期
//   subject:'', 学科 字符串值
//   type: 1, 成绩类型 (初修=1 补考=2 重修=3)
//   grade: 100
// }


let gradeList = [
    {
        id: 1,
        name: 'Nautilus',

        date: '1976',
        subject: '百达翡丽',
        type: 1,
        grade: 200000
    },
    {
        id: 2,
        name: '皇家橡树',

        date: '1972',
        subject: '爱彼',
        type: 2,
        grade: 195000
    },
    {
        id: 3,
        name: '纵横四海',
        sex: 1,
        date: '1996',
        subject: ' 江诗丹顿',
        type: 2,
        grade: 208000
    },
    {
        id: 4,
        name: '那不勒斯王后',
        sex: 2,
        date: '1812',
        subject: ' 宝玑',
        type: 2,
        grade: 100000
    },
    {
        id: 5,
        name: 'Reverso',
        sex: 2,
        date: '1931',
        subject: '积家',
        type: 2,
        grade: 30000
    },
    {
        id: 6,
        name: '潜航者',
        sex: 2,
        date: '1953',
        subject: '劳力士',
        type: 2,
        grade: 76600
    },
    {
        id: 7,
        name: '坦克',
        sex: 2,
        date: '1917',
        subject: '卡地亚',
        type: 2,
        grade: 20000
    },
    {
        id: 8,
        name: '超霸',
        sex: 2,
        date: '1957',
        subject: ' 欧米茄',
        type: 2,
        grade: 30000
    },
    {
        id: 9,
        name: '朗格1',
        sex: 2,
        date: '1994',
        subject: ' 朗格',
        type: 2,
        grade: 200000
    },
    {
        id: 10,
        name: 'Big Bang UNICO',
        sex: 2,
        date: '2013',
        subject: ' 宇舶',
        type: 2,
        grade: 100000
    }
    
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