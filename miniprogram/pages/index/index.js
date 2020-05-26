Page({
    data: {
        openid: "",
        swiperList: []
    },

    onLoad: function (options) {
        this.getOpenid();
        this.getSwiperList();
    },
    getSwiperList() {
        const db = wx.cloud.database();
        db.collection('homeSwiper').get().then(res => {
            this.setData({
                swiperList: res.data
            })
        })
    },
    // 获取用户openid
    getOpenid() {
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
            }
        })
    },

    onShareAppMessage: function () {
        return {
            title: '舞美助手',
            path: "/pages/index/index"
        }
    }
})