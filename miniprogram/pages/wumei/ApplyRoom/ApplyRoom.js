// pages/wumei/ApplyRoom/ApplyRoom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: '',
        applyNumber: {},
        startTime: '请选择',
        endTime: '请选择',
        date: '请选择',
        index: null,
        rommPicker: ['音乐厅101', '音乐厅102', '音乐厅103', '音乐厅104', '音乐厅106', '音乐厅212',
            '音乐厅306', '音乐厅307', '音乐厅308', '音乐厅309', '音乐厅310', '音乐厅312', '音乐厅314'
        ]
    },
    getOpenID() {
        wx.cloud.callFunction({
            name: "login"
        }).then((res) => {
            this.setData({
                openid: res.result.openid
            })
        })
    },
    getApplyPerson() {
        const db = wx.cloud.database();
        db.collection('zzSTNumber').where({
            _openid: this.data.openid
        }).get().then(res => {
            console.log(res)
            if (res.data.length) {
                this.setData({
                    applyNumber: res.data[0]
                })

            }
        })
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

        this.setData({
            index: e.detail.value
        })
    },
 
    formSubmit(e) {
        this.getApplyPerson();
        console.log(this.data.applyNumber)
        console.log(this.data.rommPicker[this.data.index])
        console.log(this.data.date)
        console.log(this.data.startTime)
        console.log(this.data.endTime)
        console.log(e.detail.value)
        if (this.data.date == "请选择" || this.data.startTime == "请选择" ||
            this.data.endTime == "请选择" || e.detail.value.title == "" || e.detail.value.content == "" ||
            e.detail.value.name == "" || e.detail.value.phone == ""
        ) {
            wx.showModal({
                title: '提示',
                content: '内容不完整，请检查',
            })
        } else if (!this.ischina(e.detail.value.name)) {
            wx.showModal({
                title: '提示',
                content: '姓名有误,请检查',
            })
        } else if (!this.isTelCode(e.detail.value.phone)) {
            wx.showModal({
                title: '提示',
                content: '手机号有误，请检查',
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '确定提交?',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    if (res.confirm) {
                        if (this.data.applyNumber._isPass) {
                            const db = wx.cloud.database();
                            db.collection('active-room-apply').add({
                                data: {
                                    _apply_name: this.data.applyNumber._name,
                                    _active_name: e.detail.value.title,
                                    _active_content: e.detail.value.content,
                                    _person_name: e.detail.value.name,
                                    _person_phone: e.detail.value.phone,
                                    _active_room: this.data.rommPicker[this.data.index],
                                    _active_date: this.data.date,
                                    _active_start: this.data.startTime,
                                    _active_end: this.data.endTime,
                                    _isPass: false,
                                    _post_date: new Date()
                                }
                            }).then(res => {
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                            })
                        } else if (this.data.applyNumber._name) {
                            wx.showModal({
                                title: '提示',
                                content: '组织/社团认证中',
                                cancelText: '否',
                                confirmText: '是',
                                success: res => {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '/pages/profile/zzSTNumberInfo/zzSTNumberInfo',
                                        })
                                    }
                                }
                            })
                        } else {
                            wx.showModal({
                                title: '提示',
                                content: '未进行组织/社团认证',
                                cancelText: '否',
                                confirmText: '是',
                                success: res => {
                                    if (res.confirm) {
                                        wx.navigateTo({
                                            url: '/pages/profile/zzSTIdentify/zzSTIdentify',
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }

    },
    ischina(str) {
        var reg = /^[\u4E00-\u9FA5]{1,15}$/; /*定义验证表达式*/
        return reg.test(str); /*进行验证*/
    },
    /* 检验手机号 */
    isTelCode(str) {
        var reg = /^(1[356789]\d{9})$/;
        return reg.test(str);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenID();
        this.getApplyPerson();
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