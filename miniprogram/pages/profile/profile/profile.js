const app = getApp()
Page({
    data: {
        openid: "",
        userInfo: '',
        isShowUserBtn: true,
        isShowUserInfo: false,
        bgUrl: ''
    },
    //事件处理函数
    onLoad: function () {
        this.getSetting();
        this.getOpenID();
        this.getBGUrl();
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
    gozzSTIdentify() {
        wx.navigateTo({
            url: '/pages/profile/zzSTIdentify/zzSTIdentify',
        })
    },
    /* 分享 */
    onShareAppMessage: function (res) {
        return {
            title: '舞美助手',
            path: "/pages/profile/profile/profile"
        }
    },
    openSetting() {
        wx.openSetting({
            success(res) {
                //console.log(res.authSetting)
            },
            complete: (res) => {
                this.getSetting();
            },
        })
    },
    bindGetUserInfo(e) {
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
                isShowUserBtn: false,
                isShowUserInfo: true
            })
        }
    },
    getSetting() {
        const that = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            that.setData({
                                userInfo: res.userInfo,
                                isShowUserBtn: false,
                                isShowUserInfo: true
                            })
                            // console.log(res.userInfo)
                        }
                    })
                } else {
                    that.setData({
                        isShowUserBtn: true,
                        isShowUserInfo: false
                    })
                }
            }
        })
    }
})