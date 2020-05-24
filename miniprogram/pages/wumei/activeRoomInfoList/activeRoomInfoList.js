// pages/wumei/activeRoomInfoList/activeRoomInfoList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       /*  roomList: [{
                name: '音乐厅101',
                id: 101
            }, {
                name: '音乐厅104',
                id: 104
            },
            {
                name: '音乐厅106',
                id: 106
            }, {
                name: '音乐厅109',
                id: 109
            }, {
                name: '音乐厅110',
                id: 110
            }, {
                name: '音乐厅111',
                id: 111
            }, {
                name: '音乐厅112',
                id: 112
            }, {
                name: '音乐厅113',
                id: 113
            }, {
                name: '音乐厅212',
                id: 212
            }, {
                name: '音乐厅307',
                id: 307
            }, {
                name: '音乐厅308',
                id: 308
            }, {
                name: '音乐厅309',
                id: 309
            }, {
                name: '音乐厅310',
                id: 310
            }, {
                name: '音乐厅312',
                id: 314
            }, {
                name: '音乐厅314',
                id: 314
            },


        ], */
        roomList:[]
    },
    getList(){
        const db=wx.cloud.database();
        db.collection('active-room-introduce').orderBy('_roomid','asc').get().then(res=>{
            console.log(res)
            this.setData({
                roomList:res.data
            })
        })
    },
    goActiveroomDetail(e){
       
        wx.navigateTo({
          url: '/pages/wumei/activeRoomInfoDetail/activeRoomInfoDetail?roomid='+e.target.dataset.id
        
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList();
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