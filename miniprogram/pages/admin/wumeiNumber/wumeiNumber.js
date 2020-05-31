// pages/admin/wumeiNumber/wumeiNumber.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{
            isWM: false,
            name: '认证中'
        }, {
            isWM: true,
            name: '认证成功'
        }],
        WMNumberList: [],
        TabCur: 0,
        scrollLeft: 0,
        isWM: false,
        wumeiNumberCount: ""
    },
    tabSelect(e) {
        this.setData({
            isWM: e.target.dataset.iswm,
            WMNumberList: [],
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        this.getWMNumber();
        this.getWMNumberCount();
    },
    getWMNumberCount() {
        wx.cloud.callFunction({
            name: 'getWMNumberCount',
            data: {
                iswm: this.data.isWM
            }
        }).then(res => {
            this.setData({
                wumeiNumberCount: res.result.total
            })
        })
    },
    getWMNumber() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getWumeiNumber',
            data: {
                skip: this.data.WMNumberList.length,
                limit: 10,
                isWM: this.data.isWM
            }
        }).then(res => {
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                WMNumberList: this.data.WMNumberList.concat(res.result.data)
            })

        })
    },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

       
        
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
        this.setData({
            WMNumberList:[],
            wumeiNumberCount:''
        })
        this.getWMNumber();
        this.getWMNumberCount();
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
            WMNumberList: [],
        })
        that.getWMNumber();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.WMNumberList.length < this.data.wumeiNumberCount) {
            this.getWMNumber();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})