// pages/admin/wumeiNumber/wumeiNumber.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{
            isPass: false,
            name: '认证中'
        }, {
            isPass: true,
            name: '认证成功'
        }],
        zzStNumberList: [],
        TabCur: 0,
        scrollLeft: 0,
        isPass: false,
        zzStNumberCount: ""
    },
    tabSelect(e) {
        this.setData({
            isPass: e.target.dataset.ispass,
            zzStNumberList: [],
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        this.getzzStNumber();
        this.getzzStNumberCount();
    },
    getzzStNumberCount() {
        wx.cloud.callFunction({
            name: 'getzzStNumberCount',
            data: {
                ispass: this.data.isPass
            }
        }).then(res => {
            this.setData({
                zzStNumberCount: res.result.total
            })
        })
    },
    getzzStNumber() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getzzStNumber',
            data: {
                skip: this.data.zzStNumberList.length,
                limit: 10,
                isPass: this.data.isPass
            }
        }).then(res => {

            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                zzStNumberList: this.data.zzStNumberList.concat(res.result.data)
            })

        })
    },
    failToPass(e) {
        wx.cloud.callFunction({
            name: 'updataZzStNumber',
            data: {
                id: e.target.dataset.id,
                ispass: !e.target.dataset.ispass
            }
        }).then(res => {
            let that = this;
            that.setData({
                zzStNumberList: [],
                zzStNumberCount: ""
            })
            that.getzzStNumber();
            that.getzzStNumberCount();
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
            let that = this;
            that.setData({
                zzStNumberList: [],
                zzStNumberCount: ""
            })
            that.getzzStNumber();
            that.getzzStNumberCount();
        })
    },
    del(e) {
        wx.cloud.callFunction({
            name: 'delZzStNumber',
            data: {
                id: e.target.dataset.id
            }
        }).then(res => {
            let that = this;
            that.setData({
                zzStNumberList: [],
                zzStNumberCount: ""
            })
            that.getzzStNumber();
            that.getzzStNumberCount();
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getzzStNumber();
        this.getzzStNumberCount();
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
            zzStNumberList: [],
        })
        that.getzzStNumber();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.zzStNumberList.length < this.data.zzStNumberCount) {
            this.getzzStNumber();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})