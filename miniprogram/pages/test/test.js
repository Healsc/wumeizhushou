// pages/test/test.js
var WxParse = require('../../wxParse/wxParse.js');

/**
 * WxParse.wxParse(bindName , type, data, target,imagePadding)
 * 1.bindName绑定的数据名(必填)
 * 2.type可以为html或者md(必填)
 * 3.data为传入的具体数据(必填)
 * 4.target为Page对象,一般为this(必填)
 * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
 */

Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var article = '<h1>我是HTML代码</h1>';
        var that = this;
        WxParse.wxParse('article', 'html', article, that, 5);
    },
    savaExcel(userdata) {
        let that = this
        wx.cloud.callFunction({
            name: "exceltest",
            data: {
                userdata: userdata
            },
            success(res) {
              /*   console.log("保存成功", res) */
                that.getFileUrl(res.result.fileID)
            },
            fail() {
               /*  console.log("保存失败", res) */
            }
        })
    },

    getWm() {
        let that = this;
        wx.cloud.callFunction({
            name: 'getWMNumber'
        }).then(res => {
            that.savaExcel(res.result.data)
            console.log(res.result.data)
        }).catch(err => {
            console.log('读取失败')
        })
    },

    getFileUrl(fileID) {
        let that = this;
        wx.cloud.getTempFileURL({
            fileList: [fileID],
            success: res => {
              /*   console.log("文件下载链接", res.fileList[0].tempFileURL) */
                that.setData({
                    fileUrl: res.fileList[0].tempFileURL
                })

                wx.setClipboardData({
                    data: res.fileList[0].tempFileURL,
                    success(res) {
                        wx.getClipboardData({
                            success(res) {
                                console.log("复制成功", res.data) // data
                            }
                        })
                    }
                })

            },
            fail: err => {
                // handle error
            }
        })
    },
    copyFileUrl() {
        this.getWm();
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