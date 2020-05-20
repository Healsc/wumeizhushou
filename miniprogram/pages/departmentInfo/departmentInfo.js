var WxParse = require('../../wxParse/wxParse.js');

const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        department: "",
        name: ''
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
        db.collection('department').doc(this.data.id).get().then(res => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
            var that = this;
            WxParse.wxParse('article', 'html', res.data._content, that, 5);
            console.log(res.data._name)
            this.setData({
                department: res.data,
                name: res.data._name
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
        let title = '';
        if (this.data.name == "舞美协会") {
            title = this.data.name;
        }
        return {
            title: this.data.name == "舞美协会" ? this.data.name : '舞美' + this.data.name,
            path: "/pages/departmentInfo/departmentInfo?id=" + this.data.id
        }
    }
})