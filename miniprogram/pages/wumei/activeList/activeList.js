// pages/wumei/activeList/activeList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        activeList: [{
            id: "juchang",
            name: "音乐厅剧场"
        }, {
            id: "huodongshi",
            name: "音乐厅活动室"
        }, {
            id: "dahuo",
            name: "大学生活动中心"
        }],
        activeid: "",
        activename: "",
        activeListInfo: []
    },
    /* active-juchang */
    showModal(e) {
       
        this.setData({
            activeid: e.target.dataset.id,
            activename: e.target.dataset.name,
            modalName: e.currentTarget.dataset.target
        })
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: "getActiveList",
            data: {
                id: e.target.dataset.id
            }
        }).then(res => {
            wx.hideLoading();
            this.setData({
                activeListInfo: res.result.data
            })
            // console.log(res.result.data)
        })

    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    goActiveDetail(e) {
        wx.navigateTo({
          url: '/pages/wumei/activeDetail/activeDetail?id='+e.target.dataset.id+'&activeid='+this.data.activeid,
        })
      /*   console.log(this.data.activeid)
        console.log(e.target.dataset.id) */
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setTimeout(() => {
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
        }, 2000)
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