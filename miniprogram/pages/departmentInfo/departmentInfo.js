var WxParse = require('../../wxParse/wxParse.js');

const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        department:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
        this.getDepartmentInfo();
    },
    getDepartmentInfo() {
        wx.showLoading({
          title: '加载中',
        })
        db.collection('department').doc(this.data.id).get().then(res=>{
            wx.stopPullDownRefresh();
            wx.hideLoading();

            var that = this;
            WxParse.wxParse('article', 'html', res.data._content, that, 5);
          
            this.setData({
                department:res.data
            })
        })
    },
  
    onPullDownRefresh: function () {
        let that = this;
        that.getDepartmentInfo();
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})