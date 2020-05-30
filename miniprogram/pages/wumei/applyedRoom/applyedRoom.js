// pages/wumei/applyedRoom/applyedRoom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        roomList: '',
        TabCur: 0,
        scrollLeft: 0,
        rid: 104,
        date: "",
        activeroomList: [],
        isShowToast:false
    },
    getActiveroomList() {
        wx.showLoading({
            title: '拼命加载中',
        })
        wx.cloud.callFunction({
            name: 'getActiveroomList',
            data: {
                rid: this.data.rid,
                date: this.data.date
            }
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            wx.stopPullDownRefresh({
              complete: (res) => {},
            })
            if (res.result.data.length) {
                this.setData({
                    activeroomList: res.result.data,
                    isShowToast:false
                })
            } else {
                this.setData({
                    activeroomList: [],
                    isShowToast:true
                })
            }

            console.log(res.result)
        })
    },
    getDate() {
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return Y + "-" + M + "-" + D;
    },
    getActiveList() {
        const db = wx.cloud.database();
        db.collection('active-room-introduce').orderBy('_roomid', 'asc').get().then(res => {
            this.setData({
                roomList: res.data
            })
        })
    },
    DateChange(e) {

        this.setData({
            date: e.detail.value
        })
        this.getActiveroomList();
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
            rid: e.target.dataset.rid
        })
        this.getActiveroomList();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getActiveList();
        this.setData({
            date: this.getDate()
        })
        this.getActiveroomList();
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
        that.getActiveroomList();
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
            title: '活动室预约信息',
            path: "/pages/wumei/applyedRoom/applyedRoom"
        }
    }
})