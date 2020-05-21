// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/* exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return await cloud.database().collection('wumeiNumber').get()
} */

//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
   
    let {userdata} = event
   
    //1,定义excel表格名
    let dataCVS = 'test/'+'wumeiNumber.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['id', '姓名', '性别','部门','职务', '学院','班级','学号', '联系方式']; //表属性
    alldata.push(row);
/* _academy */
    for (let key in userdata) {
      let arr = [];
      arr.push(userdata[key]._openid);
      arr.push(userdata[key]._name);
      arr.push(userdata[key]._sex);
      arr.push(userdata[key]._department);
      arr.push(userdata[key]._position);
      arr.push(userdata[key]._academy);
      arr.push(userdata[key]._major);
      arr.push(userdata[key]._studentNumber);
      arr.push(userdata[key]._phone);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}