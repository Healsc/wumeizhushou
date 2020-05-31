// pages/admin/activeroom/activeroom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        scrollLeft: 0,
        navList: [{
                isPass: 1,
                name: '待处理'
            },
            {
                isPass: 0,
                name: '拒绝'
            }, {
                isPass: 2,
                name: '通过'
            }
        ],
        isPass: 1,
        applyList: [],
        applyCount: ''
    },
    getActiveApplyByIsPass() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getActiveApplyByIsPass',
            data: {
                ispass: this.data.isPass,
                skip: this.data.applyList.length,
                limit: 10
            }
        }).then(res => {
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                applyList: this.data.applyList.concat(res.result.data)
            })

        })
    },
    getCount() {
        wx.cloud.callFunction({
            name: 'getApplyCount',
            data: {
                ispass: this.data.isPass
            }
        }).then(res => {
            this.setData({
                applyCount: res.result.total
            })

        })
    },
    tabSelect(e) {
        this.setData({
            isPass: e.target.dataset.ispass,
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        let that = this;
        that.setData({
            applyList: []
        })
        that.getActiveApplyByIsPass();
        that.getCount();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /* let that = this;
       
        that.getActiveApplyByIsPass();
        that.getCount(); */
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
        let that = this;
         
        that.setData({
            applyList: [],
            applyCount: ''

        })
        that.getActiveApplyByIsPass();
        that.getCount();
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
            applyList: [],
            applyCount: ''
        })
        that.getActiveApplyByIsPass();
        that.getCount();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

        if (this.data.applyList.length < this.data.applyCount) {
            this.getActiveApplyByIsPass();
            this.getCount();
        } else {
            wx.showToast({
                title: '到底了',
                icon: 'none',
                duration: 1000
            })
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})