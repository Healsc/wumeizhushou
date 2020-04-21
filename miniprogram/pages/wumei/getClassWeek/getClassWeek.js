// pages/wumei/getClassWeek/getClassWeek.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openID:"",
        weekList:[
            1,2,3
        ]
    },
    getOpenID(){
        wx.cloud.callFunction({
            name:'login'
        }).then(res=>{
            this.setData({
                openID:res.result.openid
            })
        })
    },  
    goGetClass(e){
       
        const db = wx.cloud.database();
        db.collection('class-week-' + e.target.dataset.weekid).where({
            _openid: this.data.openID
        }).get().then(res=>{
            if(res.data.length){
                wx.showModal({
                    title: '提示',
                    content: '你已提交过',
                })
            }else{
                wx.navigateTo({
                  url: '/pages/wumei/getClassDetail/getClassDetail?week='+e.target.dataset.weekid,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenID();
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