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
        rommPicker: ['音乐厅101', '音乐厅104', '音乐厅106',
        '音乐厅109', '音乐厅110', '音乐厅111',
        '音乐厅112','音乐厅113', '音乐厅212',
            '音乐厅307', '音乐厅308', 
            '音乐厅309', '音乐厅310', '音乐厅312', '音乐厅314'
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
            if (res.data.length) {
                this.setData({
                    applyNumber: res.data[0]
                })
            }
        })
    },
    showModal() {
        setTimeout(() => {
            wx.showModal({
                title: '确保你已经进行组织/社团认证',
                content: "可以前往 我的->组织/社团认证 进行认证"
            })
        }, 1000)

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
                                    _apply_department_position: this.data.applyNumber._department+' '+this.data.applyNumber._position,
                                    _active_name: e.detail.value.title,
                                    _active_content: e.detail.value.content,
                                    _person_name: e.detail.value.name,
                                    _person_phone: e.detail.value.phone,
                                    _active_department:this.data.applyNumber._department,
                                    _active_room: this.data.rommPicker[this.data.index],
                                    _active_date: this.data.date,
                                    _active_start: this.data.startTime,
                                    _active_end: this.data.endTime,
                                    _isPass: 1,
                                    /* 0拒绝  1审核中 2 通过*/
                                    _post_date: new Date(),
                                    _post_show_date: this.getDate()
                                }
                            }).then(res => {
                                wx.showToast({
                                    title: '提交成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                                setTimeout(() => {
                                    wx.navigateTo({
                                        url: '/pages/wumei/myApplyRoom/myApplyRoom',
                                    })
                                }, 1000)
                            })
                        } else if (this.data.applyNumber._name) {
                            wx.showModal({
                                title: '组织/社团认证中',
                                content: '请前往 我的->组织/社团认证',
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
                                title: '未进行组织/社团认证',
                                content: '请前往 我的->组织/社团认证',
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
    getDate() {
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        //秒
        var s = date.getSeconds();
        return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
        //console.log("当前时间：" + Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
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
        this.showModal();
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