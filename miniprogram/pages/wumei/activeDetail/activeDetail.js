var WxParse = require('../../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeDetail: {}
    },

    onLoad: function (options) {

        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getActiveDetail',
            data: {
                id: options.id,
                activeid: 'huodongshi'
            }
        }).then(res => {
            var that = this;
            WxParse.wxParse('article', 'html', res.result.data._content, that, 3);
            this.setData({
                activeDetail: res.result.data
            })
            wx.hideLoading({
                complete: (res) => {},
            })
        })
    }

})