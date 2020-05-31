const app = getApp()
Page({
    data: {
        openid: "",
        userInfo: '',
        bgUrl: ''
    },
    //事件处理函数
    onLoad: function () {
        this.getBGUrl();
        this.getOpenID();

    },
    getBGUrl() {
        const db = wx.cloud.database();
        db.collection('profileBG').doc('profileBG').get().then(res => {
            // console.log(res)
            this.setData({
                bgUrl: res.data
            })
        })
    },
    /* 获取openid */
    getOpenID() {
        wx.cloud.callFunction({
            name: "login"
        }).then((res) => {
            this.setData({
                openid: res.result.openid
            })

        })
    },
    /* 舞美认证 */
    goWNIdentify() {
        const db = wx.cloud.database();
        db.collection('wumeiNumber').where({
            _openid: this.data.openid
        }).get().then((res) => {
            if (res.data.length) {
                wx.navigateTo({
                    url: '/pages/profile/wmNumberInfo/wmNumberInfo',
                })
            } else {
                wx.navigateTo({
                    url: '/pages/profile/wmIdentify/wmIdentify',
                })
            }
        })
    },
    getZzStNumberInfo() {
        const db = wx.cloud.database();
        db.collection('zzSTNumber').where({
            _openid: this.data.openid
        }).get().then(res => {
            if (res.data.length) {
                wx.navigateTo({
                    url: '/pages/profile/zzSTNumberInfo/zzSTNumberInfo',
                })
            } else {
                wx.navigateTo({
                    url: '/pages/profile/zzSTIdentify/zzSTIdentify',
                })
            }
        })
    },
  
    /* 分享 */
    onShareAppMessage: function (res) {
        return {
            title: '舞美助手',
            path: "/pages/profile/profile/profile"
        }
    }
})