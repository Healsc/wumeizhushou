// pages/info/noticeDetail/noticeDetail.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        content: ""
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
                wx.stopPullDownRefresh();
                wx.hideLoading({
                    complete: (res) => {},
                })
                this.setData({
                    content: res.result.data._content
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getNoticeDetail();
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
        let that = this;
        that.setData({
            id: this.data.id,
            content: ""
        })
        that.getNoticeDetail();
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

        return {
            title: '东农舞美',
            path: "/pages/info/noticeDetail/noticeDetail?id=" + this.data.id
        }
    }

})