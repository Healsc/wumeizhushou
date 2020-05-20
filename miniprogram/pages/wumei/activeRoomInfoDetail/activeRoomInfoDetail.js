var WxParse = require('../../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomid: "",
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            roomid: options.roomid
        })
        this.getDetail();

    },
    getDetail() {
        const db = wx.cloud.database();
        db.collection('active-room-introduce').where({
            _roomid: this.data.roomid
        }).get().then(res => {
            var that = this;
            WxParse.wxParse('article', 'html', res.data[0]._content, that, 5);
            this.setData({
                detail: res.data[0]
            })

        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.detail._title,
            path: "/pages/wumei/activeRoomInfoDetail/activeRoomInfoDetail?roomid=" + this.data.roomid
        }
    }
})