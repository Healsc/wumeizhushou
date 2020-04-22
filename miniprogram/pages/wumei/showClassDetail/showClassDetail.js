Page({

    data: {
        departmentid: "",
        weekid: "",
        classInfo: [],

        Mon1List: [],
        Mon2List: [],
        Mon3List: [],
        Mon4List: [],
        Mon5List: [],

        Tue1List: [],
        Tue2List: [],
        Tue3List: [],
        Tue4List: [],
        Tue5List: [],

        Wed1List: [],
        Wed2List: [],
        Wed3List: [],
        Wed4List: [],
        Wed5List: [],

        Thu1List: [],
        Thu2List: [],
        Thu3List: [],
        Thu4List: [],
        Thu5List: [],

        Fri1List: [],
        Fri2List: [],
        Fri3List: [],
        Fri4List: [],
        Fri5List: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            departmentid: options.did,
            weekid: options.wid
        })
        this.getClass();
    },
    getClass() {
        wx.cloud.callFunction({
            name: 'getClassDetail',
            data: {
                departmentid: this.data.departmentid,
                weekid: this.data.weekid
            }
        }).then(res => {
            this.setData({
                classInfo: res.result.data
            })
            this.setList();
            console.log(res)
            console.log(res.result.data)
        })
    },
    setList: function () {
        var classInfoLen = this.data.classInfo.length;
        for (let i = 0; i < classInfoLen; i++) {

            /* 周一开始 */
            if (!this.data.classInfo[i]._class11) {
                this.setData({
                    Mon1List: this.data.Mon1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class12) {
                this.setData({
                    Mon2List: this.data.Mon2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class13) {
                this.setData({
                    Mon3List: this.data.Mon3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class14) {
                this.setData({
                    Mon4List: this.data.Mon4List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class15) {
                this.setData({
                    Mon5List: this.data.Mon5List.concat(this.data.classInfo[i]._name)
                })
            }
            /* 周一结束 */

            /* 周二开始 */

            if (!this.data.classInfo[i]._class21) {
                this.setData({
                    Tue1List: this.data.Tue1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class22) {
                this.setData({
                    Tue2List: this.data.Tue2List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class23) {
                this.setData({
                    Tue3List: this.data.Tue3List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class24) {
                this.setData({
                    Tue4List: this.data.Tue4List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class25) {
                this.setData({
                    Tue5List: this.data.Tue5List.concat(this.data.classInfo[i]._name)
                })

            }
            /* 周二结束 */

            /* 周三开始 */
            if (!this.data.classInfo[i]._class31) {
                this.setData({
                    Wed1List: this.data.Wed1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class32) {
                this.setData({
                    Wed2List: this.data.Wed2List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class33) {
                this.setData({
                    Wed3List: this.data.Wed3List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class34) {
                this.setData({
                    Wed4List: this.data.Wed4List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class35) {
                this.setData({
                    Wed5List: this.data.Wed5List.concat(this.data.classInfo[i]._name)
                })

            }
            /* 周三结束 */

            /* 周四开始 */
            if (!this.data.classInfo[i]._class41) {
                this.setData({
                    Thu1List: this.data.Thu1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class42) {
                this.setData({
                    Thu2List: this.data.Thu2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class43) {
                this.setData({
                    Thu3List: this.data.Thu3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class44) {
                this.setData({
                    Thu4List: this.data.Thu4List.concat(this.data.classInfo[i]._name)
                })

            }
            if (!this.data.classInfo[i]._class45) {
                this.setData({
                    Thu5List: this.data.Thu5List.concat(this.data.classInfo[i]._name)
                })

            }
            /* 周四结束 */
            /* 周五开始 */
            if (!this.data.classInfo[i]._class51) {
                this.setData({
                    Fri1List: this.data.Fri1List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class52) {
                this.setData({
                    Fri2List: this.data.Fri2List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class53) {
                this.setData({
                    Fri3List: this.data.Fri3List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class54) {
                this.setData({
                    Fri4List: this.data.Fri4List.concat(this.data.classInfo[i]._name)
                })
            }
            if (!this.data.classInfo[i]._class55) {
                this.setData({
                    Fri5List: this.data.Fri5List.concat(this.data.classInfo[i]._name)
                })
            }
            /* 周五结束 */
        }
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