export function getDateTime(type) {
  var date = new Date();
  var hengGang = "-";
  var maoHao = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var curDate = date.getDate();
  var curHours = date.getHours();
  var curMinutes = date.getMinutes();
  var curSeconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (curDate >= 0 && curDate <= 9) {
    curDate = "0" + curDate;
  }
  if (curHours >= 0 && curHours <= 9) {
    curHours = "0" + curHours;
  }
  if (curMinutes >= 0 && curMinutes <= 9) {
    curMinutes = "0" + curMinutes;
  }
  if (curSeconds >= 0 && curSeconds <= 9) {
    curSeconds = "0" + curSeconds;
  }
  var currentdate = "";
  if (type == "year") {
    currentdate = year;
    return currentdate;
  } else if (type == "month") {
    currentdate = year + hengGang + month;
    return currentdate;
  } else if (type == "day") {
    currentdate = year + hengGang + month + hengGang + curDate + " ";
    return currentdate;
  } else {
    currentdate = year + hengGang + month + hengGang + curDate + " " + curHours + maoHao + curMinutes + maoHao + curSeconds;
    return currentdate;
  }
}

export function formatDate(date) {
  // 将日期对象转换为 'YYYY-MM-DD' 格式的字符串
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getAgeFromBirthday(birth){
  const birthday = new Date(birth);
  const today = new Date();
  const ageInMilliseconds = today.getTime() - birthday.getTime();
  const ageInYears = Math.floor(
    ageInMilliseconds / (365 * 24 * 60 * 60 * 1000)
  );
  return ageInYears;
}

export function listToTree(data) {
  // * 先生成parent建立父子关系
  const obj = {};
  data.forEach((item) => {
    // let d = {};
    // d.id = item.id;
    // d.label = item.departName;
    obj[item.id] = item;
  });
  // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
  // console.log("2222222=========", obj)
  const parentList = [];
  data.forEach((item) => {
    const parent = obj[item.parentId];
    if (parent) {
      // * 当前项有父节点
      parent.children = parent.children || [];
      parent.children.push(item);
    } else {
      // * 当前项没有父节点 -> 顶层
      parentList.push(item);
    }
  });
  return parentList;
}