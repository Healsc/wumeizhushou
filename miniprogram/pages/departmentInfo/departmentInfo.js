// pages/departmentInfo/departmentInfo.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
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
            console.log(res)
            this.setData({
                department:res.data,
                content:res.data._content
            })
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
        that.getDepartmentInfo();
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