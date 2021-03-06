// pages/wumei/dutyList/dutyList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dutyList: [],
        wmInfo: {},
        isWM: false,
        openid: ""
    },
    getDutyList() {
        wx.showLoading({
            title: '加载中',
        });
        wx.stopPullDownRefresh();
        wx.cloud.callFunction({
            name: 'getDutyList'
        }).then(res => {
            wx.hideLoading();
            this.setData({
                dutyList: res.result.data
            })
            /*    console.log(res.result.data) */
        })
    },
    getOpenid() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            this.setData({
                openid: res.result.openid
            })
            this.isWM();
            // console.log(res.result.openid)
        });
    },
    isWM() {
        const db = wx.cloud.database();
        db.collection('wumeiNumber').where({
            _openid: this.data.openid
        }).get().then(res => {
            if (res.data.length) {
                this.setData({
                    wmInfo: res.data[0],
                    isWM: res.data[0]._isWM
                })

            }

        })
    },
    goDutyDetail(e) {
        this.isWM();
        if (this.data.isWM) {
            wx.navigateTo({
                url: '/pages/wumei/dutyDetail/dutyDetail?id=' + e.target.dataset.id,
            })
        } else {
            wx.showModal({
                title: '未进行舞美认证或认证中',
                content: "请前往 我的->舞美认证",
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDutyList();
        this.getOpenid();
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
            isWM: false,
        })
        that.getDutyList();
        that.getOpenid();
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