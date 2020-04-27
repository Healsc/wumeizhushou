// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return db.collection('active-room-apply').orderBy('_post_date','desc').where({
        _isPass:event.ispass
    }).skip(event.skip).limit(event.limit).get()
}