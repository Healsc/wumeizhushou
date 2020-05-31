// pages/admin/activeroomDetail/activeroomDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        applyid: '',
        applyDetail: {},
        applyPerson: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            id: options.id

        })
        this.getApplyDetail();
    },
    getApplyDetail() {
        wx.cloud.callFunction({
            name: 'getApplyDetail',
            data: {
                id: this.data.id
            }
        }).then(res => {
            this.setData({
                applyDetail: res.result.data,
                applyid: res.result.data._apply_id
            })
           
            this.getApplyPersonInfo();
        })
    },
    getApplyPersonInfo() {
        wx.cloud.callFunction({
            name: 'getApplyPersonInfo',
            data: {
                id: this.data.applyid
            }
        }).then(res => {
            console.log((res.result.data))
            this.setData({
                applyPerson: res.result.data
            })
          
        })
    },

    notPass(e) {
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'updataApplyIsPass',
            data: {
                id: e.target.dataset.id,
                ispass: 0
            }
        }).then(res => {
            wx.hideLoading({
              complete: (res) => {},
            })
            let that = this;
            that.setData({
                applyDetail: ''
            })
            that.getApplyDetail();
           
        })

    },
    pass(e) {
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'updataApplyIsPass',
            data: {
                id: e.target.dataset.id,
                ispass: 2
            }
        }).then(res => {
            wx.hideLoading({
              complete: (res) => {},
            })
            let that = this;
            that.setData({
                applyDetail: {}
            })
            that.getApplyDetail();
          
        })

    },
    toWait(e) {
       wx.showLoading({
         title: '加载中',
       })
        wx.cloud.callFunction({
            name: 'updataApplyIsPass',
            data: {
                id: e.target.dataset.id,
                ispass: 1
            }
        }).then(res => {
            wx.hideLoading({
              complete: (res) => {},
            })
            let that = this;
            that.setData({
                applyDetail: {}
            })
            that.getApplyDetail();
           
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