// pages/wumei/showClassList/showClassList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        weekList: [],
        departmentList: [
            '办公室',
            '技术部',
            '干训部',
            '宣传部',
            '纪检部',
            '外勤部'
        ],
        weekid: "",
        openid: "",
        isWM: false
    },
    getWeekList() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getShowClassWeek'
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                weekList: res.result.data
            })
            //  console.log(res.result.data)
        })
    },
    getOpenid() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            this.setData({
                openid: res.result.openid
            })
            this.isWM();

        });
    },
    isWM() {
        const db = wx.cloud.database();
        db.collection('wumeiNumber').where({
            _openid: this.data.openid
        }).get().then(res => {
            if (res.data.length) {
                this.setData({
                    isWM: res.data[0]._isWM
                })
            }

        })
    },
    showModal(e) {
        this.setData({
            weekid: e.target.dataset.weekid
        })
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    goShowClassDetail(e) {
        if (this.data.isWM) {
            wx.navigateTo({
                url: '/pages/wumei/showClassDetail/showClassDetail?did=' + e.target.dataset.did + '&wid=' + e.target.dataset.wid,
            })
        } else {
            wx.showModal({
                title: '未进行舞美认证或认证中',
                content: "请前往 我的->舞美认证 ",
            })

        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getWeekList();
        this.getOpenid();
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