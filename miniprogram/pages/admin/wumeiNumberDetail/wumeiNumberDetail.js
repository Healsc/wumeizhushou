// pages/admin/wumeiNumberDetail/wumeiNumberDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        numberDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        console.log(options.id)
        wx.cloud.database().collection('wumeiNumber').doc(options.id).get().then(res => {

            this.setData({
                numberInfo: res.data
            })
        })
    },
    getDetail() {
        wx.showLoading({
            title: '更新中',
        })
        wx.cloud.database().collection('wumeiNumber').doc(this.data.id).get().then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                numberInfo: res.data
            })
        })
    },
    failToPass(e) {
        wx.cloud.callFunction({
            name: 'updataWMNumber',
            data: {
                id: e.target.dataset.id,
                iswm: !e.target.dataset.iswm
            }
        }).then(res => {
            let that = this;
            that.getDetail();

        })
    },
    passTofail(e) {
        wx.cloud.callFunction({
            name: 'updataWMNumber',
            data: {
                id: e.target.dataset.id,
                iswm: !e.target.dataset.iswm
            }
        }).then(res => {
            let that = this;
            that.getDetail();

        })
    },
    del(e) {
        wx.cloud.callFunction({
            name: 'delWMNumber',
            data: {
                id: e.target.dataset.id
            }
        }).then(res => {
            let that = this;
            that.getDetail();
        })
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