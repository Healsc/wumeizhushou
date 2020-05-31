// pages/admin/zzStNumberDetail/zzStNumberDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        wx.cloud.database().collection('zzSTNumber').doc(options.id).get().then(res => {

            this.setData({
                numberInfo: res.data
            })
        })
    },
    getDetail() {
        wx.cloud.database().collection('zzSTNumber').doc(this.data.id).get().then(res => {
            this.setData({
                numberInfo: res.data
            })
            
        })
    },
    showQrcode(e) {
        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url
        })
    },
    failToPass(e) {
        console.log('2')
        wx.cloud.callFunction({
            name: 'updataZzStNumber',
            data: {
                id: e.target.dataset.id,
                ispass: !e.target.dataset.ispass
            }
        }).then(res => {
            this.getDetail();
        })
    },
    passTofail(e) {
        wx.cloud.callFunction({
            name: 'updataZzStNumber',
            data: {
                id: e.target.dataset.id,
                ispass: !e.target.dataset.ispass
            }
        }).then(res => {
            this.getDetail();
        })
    },
    del(e) {
        wx.cloud.callFunction({
            name: 'delZzStNumber',
            data: {
                id: e.target.dataset.id
            }
        }).then(res => {
            wx.navigateBack({
                delta: 1
            })
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