// pages/baominginfo/baominginfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       updataLog:[]
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        const db = wx.cloud.database({
            //env: 'wumei-2070bb'
        })
        db.collection('updataLog').orderBy('_order','desc').get({
            success: (res) => {

                this.setData({
                    updataLog: res.data
                })
               
            },
            fail: (res) => {
                wx.showModal({
                    title: '提示',
                    content: '请刷新',
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
