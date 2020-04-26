// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
/*  await db.collection('active-room-apply').orderBy('_active_start','asc').where({
        _active_room:'音乐厅'+'314',
        _active_date:'2020-09-01'
    }).get() */

    /* {
       id: event.rid,
       date:event.date

    } */
    return await db.collection('active-room-apply').where({
        _active_room:'音乐厅'+event.rid,
        _active_date:event.date,
        _isPass:2
    }).orderBy('_active_start','asc').get()
}