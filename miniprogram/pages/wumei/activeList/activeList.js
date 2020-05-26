// pages/wumei/activeList/activeList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeListInfo: [],
        isWM: false,
        openid: ""
    },
    getOpenid() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            this.setData({
                openid: res.result.openid

            })
            this.isWM();
        })

    },
    isWM() {
        const db = wx.cloud.database();
        db.collection('wumeiNumber').where({
            _openid: this.data.openid
        }).get().then(res => {
            if (res.data.length) {
                this.setData({
                    isWM: res.data[0]._isWM
                })
            }
        })
    },
    /* active-juchang */
    getList() {
        wx.cloud.callFunction({
            name: "getActiveList",
            data: {
                id: 'huodongshi'
            }
        }).then(res => {
            wx.hideLoading();
            this.setData({
                activeListInfo: res.result.data
            })
            // console.log(res.result.data)
        })
    },
   
    goActiveDetail(e) {
        if (this.data.isWM) {
            wx.navigateTo({
                url: '/pages/wumei/activeDetail/activeDetail?id=' + e.target.dataset.id + '&activeid=' + this.data.activeid,
            })
        } else {
            wx.showModal({
                title: '未进行舞美认证或认证中',
                content: "请前往 我的->舞美认证",
            })
        }

        /*   console.log(this.data.activeid)
          console.log(e.target.dataset.id) */
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid();
        this.getList();
      
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
        that.onLoad();
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