// pages/wumei/myApplyRoom/myApplyRoom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        myApplyList: [],
        TabCur: 0,
        scrollLeft: 0,
        navList: [{
            id: 3,
            name: '全部'
        }, {
            id: 1,
            name: '申请中'
        }, {
            id: 2,
            name: '申请成功'
        }, {
            id: 0,
            name: '申请失败'
        }],
        applyCount: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    getOpenId() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {

            this.setData({
                openid: res.result.openid
            })
            this.getMyApplyRoom();
        })
    },
    getApplyCounts() {
        const db = wx.cloud.database();
        db.collection('active-room-apply').where({
            _openid: this.data.openid
        }).count().then(res => {
            this.setData({
                applyCount: res.total
            })
           
        }).catch(err => {
            console.error(err)
        })
    },
    getMyApplyRoom() {
        wx.stopPullDownRefresh({
            complete: (res) => {},
        })
        wx.cloud.callFunction({
            name: 'getMyApplyRoom',
            data: {
                openid: this.data.openid
            }
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                myApplyList: res.result.data
            })
        })


    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        wx.showLoading({
            title: '加载中',
        })
        if (e.target.dataset.aid == 3) {
            this.getMyApplyRoom();
            this.getApplyCounts();
        } else {
            wx.cloud.callFunction({
                name: 'getMyApplyRoomByIsPass',
                data: {
                    isPass: e.target.dataset.aid,
                    openid:this.data.openid
                }
            }).then(res => {
                wx.hideLoading({
                    complete: (res) => {},
                })
                this.setData({
                    myApplyList: res.result.data
                })
            })

            const db = wx.cloud.database();
            db.collection('active-room-apply').where({
                _openid: this.data.openid,
                _isPass: e.target.dataset.aid
            }).count().then(res => {
                this.setData({
                    applyCount: res.total
                })
                console.log(res)
            }).catch(err => {
                console.error(err)
            })
        }
    },
    onLoad: function (options) {

        this.getOpenId();
        this.getApplyCounts();
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
            TabCur: 0,
            scrollLeft: 0,
        })
        that.getOpenId();
        that.getApplyCounts();
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