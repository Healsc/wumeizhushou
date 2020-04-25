// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return await db.collection('active-room-apply').orderBy('_post_date','desc').where({
        _isPass:event.isPass,
        _openid:event.openid
    }).get()
}