// pages/wumei/ApplyRoom/ApplyRoom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startTime: '请选择',
        endTime: '请选择',
        date: '请选择',
        index: null,
        rommPicker: ['音乐厅101', '音乐厅102', '音乐厅103','音乐厅104','音乐厅106','音乐厅212',
        '音乐厅306','音乐厅307','音乐厅308','音乐厅309','音乐厅310','音乐厅312','音乐厅314']
    },
    startTimeChange(e) {
        this.setData({
            startTime: e.detail.value
        })
    },
    endTimeChange(e) {
        this.setData({
            endTime: e.detail.value
        })
    },
    DateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    PickerChange(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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