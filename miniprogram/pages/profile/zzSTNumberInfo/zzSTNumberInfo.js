// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        numberInfo: {},
        openid: "",
        isPass: false
    },
    // 获取用户openid
    getOpenid() {

        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                //console.log(res.result)
                //console.log('云函数获取到的openid: ', res.result.openid)
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                that.getnumberInfo();
            }
        })
    },

    onLoad: function (options) {
        this.getOpenid();
        
    },
    getnumberInfo() {
        console.log('ss')
        const db = wx.cloud.database({
            //env: 'wumei-2070bb'
        })
        db.collection('zzSTNumber').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                console.log(res.data)
                wx.stopPullDownRefresh({
                    complete: (res) => {},
                })
                if (res.data.length) {
                    console.log('ss')
                    this.setData({
                        numberInfo: res.data[0],
                        isPass: res.data[0]._isPass
                    })
                }
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请稍后重试',
                })
            }
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
        let that = this;
        that.getnumberInfo();
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