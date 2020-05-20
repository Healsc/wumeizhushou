var WxParse = require('../../../wxParse/wxParse.js');

Page({

    data: {
        id: ""
    },
    getNoticeDetail() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getNoticeDetail',
            data: {
                id: this.data.id
            },
            success: (res) => {
                var that = this;
                WxParse.wxParse('article', 'html', res.result.data._content, that, 5);
                wx.stopPullDownRefresh();
                wx.hideLoading({
                    complete: (res) => {},
                })
            }
        })
    },
   
    onLoad: function (options) {

        this.setData({
            id: options.id
        })
        this.getNoticeDetail();
    },

    onPullDownRefresh: function () {
        let that = this;
        that.setData({
            id: this.data.id,
        })
        that.getNoticeDetail();
    },

    onShareAppMessage: function () {

        return {
            title: '东农舞美助手',
            path: "/pages/info/noticeDetail/noticeDetail?id=" + this.data.id
        }
    }

})