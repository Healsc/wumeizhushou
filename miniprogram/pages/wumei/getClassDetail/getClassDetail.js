Page({
    data: {
        openid: "",
        weekId: "",
        wumeiInfo: {},
        isWM: false,
        class11: false,
        class12: false,
        class13: false,
        class14: false,
        class15: false,

        class21: false,
        class22: false,
        class23: false,
        class24: false,
        class25: false,

        class31: false,
        class32: false,
        class33: false,
        class34: false,
        class35: false,

        class41: false,
        class42: false,
        class43: false,
        class44: false,
        class45: false,

        class51: false,
        class52: false,
        class53: false,
        class54: false,
        class55: false,
    },


    onLoad: function (options) {
        this.setData({
            weekId: options.week
        })
        this.getOpenid();
        this.getUserInfo();
    },
    // 获取用户openid
    getOpenid() {
        console.log(this.data.isWM)
        let that = this;
        wx.cloud.callFunction({
            name: 'login',
            complete: res => {
                var openid = res.result.openid;
                that.setData({
                    openid: openid
                })
                this.getUserInfo();
            }
        })
    },
    getUserInfo() {
        const db = wx.cloud.database({

        })
        db.collection('wumeiNumber').where({
            _openid: this.data.openid // 填入当前用户 openid
        }).get({
            success: (res) => {
                // console.log(res)
                if (res.data.length) {
                    this.setData({
                        wumeiInfo: res.data[0],
                        isWM: res.data[0]._isWM
                    })
                }

            },
            fail: (err) => {
                wx.showModal({
                    cancelColor: 'cancelColor',
                })
            }
        })
    },
    formSubmit(e) {
        // console.log(this.data.isWM)
        wx.showModal({
            title: '',
            content: '确定提交课表？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    if (this.data.isWM) {
                        const db = wx.cloud.database();
                        db.collection('class-week-' + this.data.weekId).add({
                            data: {
                                _id: this.data.wumeiInfo._department + this.data.wumeiInfo._name,
                                _name: this.data.wumeiInfo._name, //姓名
                                _department: this.data.wumeiInfo._department, //部门
                                _position: this.data.wumeiInfo._position,
                                _time: new Date(), //提交时间

                                _class11: this.data.class11,
                                _class12: this.data.class12,
                                _class13: this.data.class13,
                                _class14: this.data.class14,
                                _class15: this.data.class15,

                                _class21: this.data.class21,
                                _class22: this.data.class22,
                                _class23: this.data.class23,
                                _class24: this.data.class24,
                                _class25: this.data.class25,

                                _class31: this.data.class31,
                                _class32: this.data.class32,
                                _class33: this.data.class33,
                                _class34: this.data.class34,
                                _class35: this.data.class35,

                                _class41: this.data.class41,
                                _class42: this.data.class42,
                                _class43: this.data.class43,
                                _class44: this.data.class44,
                                _class45: this.data.class45,

                                _class51: this.data.class51,
                                _class52: this.data.class52,
                                _class53: this.data.class53,
                                _class54: this.data.class54,
                                _class55: this.data.class55
                            },
                            success: function (res) {
                                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 3000)
                            },
                            fail: function () {
                                wx.showToast({
                                    title: '提交失败',
                                    icon: 'none',
                                    duration: 3000
                                })
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 3000)
                            }
                        })
                    } else {
                        wx.showModal({
                            title: '未进行舞美认证或认证中',
                            content: "请前往 我的->舞美认证",
                        })
                    }

                }
            }
        })
    },


    updata11() {
        let actice = this.data.class11;
        this.setData({
            class11: !actice
        })
    },
    updata21() {
        let actice = this.data.class21;
        this.setData({
            class21: !actice
        })
    },
    updata31() {
        let actice = this.data.class31;
        this.setData({
            class31: !actice
        })
    },
    updata41() {
        let actice = this.data.class41;
        this.setData({
            class41: !actice
        })
    },
    updata51() {
        let actice = this.data.class51;
        this.setData({
            class51: !actice
        })
    },


    /* 第二节开始 */
    updata12() {
        let actice = this.data.class12;
        this.setData({
            class12: !actice
        })
    },
    updata22() {
        let actice = this.data.class22;
        this.setData({
            class22: !actice
        })
    },
    updata32() {
        let actice = this.data.class32;
        this.setData({
            class32: !actice
        })
    },
    updata42() {
        let actice = this.data.class42;
        this.setData({
            class42: !actice
        })
    },
    updata52() {
        let actice = this.data.class52;
        this.setData({
            class52: !actice
        })
    },
    /* 第二节结束 */

    /* 第三节开始 */
    updata13() {
        let actice = this.data.class13;
        this.setData({
            class13: !actice
        })
    },
    updata23() {
        let actice = this.data.class23;
        this.setData({
            class23: !actice
        })
    },
    updata33() {
        let actice = this.data.class33;
        this.setData({
            class33: !actice
        })
    },
    updata43() {
        let actice = this.data.class43;
        this.setData({
            class43: !actice
        })
    },
    updata53() {
        let actice = this.data.class53;
        this.setData({
            class53: !actice
        })
    },
    /* 第三节结束 */

    /* 第四节开始 */
    updata14() {
        let actice = this.data.class14;
        this.setData({
            class14: !actice
        })
    },
    updata24() {
        let actice = this.data.class24;
        this.setData({
            class24: !actice
        })
    },
    updata34() {
        let actice = this.data.class34;
        this.setData({
            class34: !actice
        })
    },
    updata44() {
        let actice = this.data.class44;
        this.setData({
            class44: !actice
        })
    },
    updata54() {
        let actice = this.data.class54;
        this.setData({
            class54: !actice
        })
    },
    /* 第四节结束 */


    /* 第五节开始 */
    updata15() {
        let actice = this.data.class15;
        this.setData({
            class15: !actice
        })
    },
    updata25() {
        let actice = this.data.class25;
        this.setData({
            class25: !actice
        })
    },
    updata35() {
        let actice = this.data.class35;
        this.setData({
            class35: !actice
        })
    },
    updata45() {
        let actice = this.data.class45;
        this.setData({
            class45: !actice
        })
    },
    updata55() {
        let actice = this.data.class55;
        this.setData({
            class55: !actice
        })
    },
    /* 第五节结束 */
})