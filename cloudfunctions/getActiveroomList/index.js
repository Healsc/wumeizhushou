// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    return await db.collection('active-room-apply').where({
        _active_room:event.rid,
        _active_date:event.date,
        _isPass:2
    }).orderBy('_active_start','asc').get()
}