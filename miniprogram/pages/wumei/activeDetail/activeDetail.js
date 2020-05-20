var WxParse = require('../../../wxParse/wxParse.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getActiveDetail',
            data: {
                id: options.id,
                activeid: options.activeid
            }
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            var that = this;
            WxParse.wxParse('article', 'html', res.result.data._content, that, 3);
            this.setData({
                activeDetail: res.result.data
            })
            /*  console.log(res.result.data) */
        })
        /*  console.log(options) */
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})