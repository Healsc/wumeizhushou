const app = getApp();

Page({
    data: {
        wumeiInfo: {},
        index: null,
        imgList: [],
        fileIds: [],
        multiIndex: [0, 0]
    },



    /*检验中文 */
    ischina(str) {
        var reg = /^[\u4E00-\u9FA5]{1,15}$/; /*定义验证表达式*/
        return reg.test(str); /*进行验证*/
    },
    /*校验学号 */
    isSNo(str) {
        var reg = /^(A([012]\d{1}[12][0123456789]\d{4}))$/;
        return reg.test(str); /*进行验证*/
    },
    /* 检验手机号 */
    isTelCode(str) {
        var reg = /^(1[356789]\d{9})$/;
        return reg.test(str);
    },
    //表单   //验证 提交到数据库
    formSubmit(e) {
        console.log(e)
        if (e.detail.value.name == "" || e.detail.value.studentNumber == "" ||
            e.detail.value.phone == "" || e.detail.value.department == "" ||
            e.detail.value.position == ""
        ) {
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {

                }

            })
        } else if (!this.ischina(e.detail.value.name)) {
            wx.showModal({
                title: '',
                content: '姓名有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isSNo(e.detail.value.studentNumber)) {
            wx.showModal({
                title: '',
                content: '学号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isTelCode(e.detail.value.phone)) {
            wx.showModal({
                title: '',
                content: '手机号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (this.data.imgList.length == 0) {
            wx.showModal({
                title: '提示',
                content: '请提交照片！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else {
            wx.showModal({
                title: '',
                content: '确定提交信息',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '提交中',
                        })
                        const promiseArr = [];
                        for (let i = 0; i < this.data.imgList.length; i++) {
                            promiseArr.push(new Promise((resolve, reject) => {
                                let item = this.data.imgList[i];
                                let suffix = /\.[^\.]+$/.exec(this.data.imgList[i])[0];
                                // 上传图片
                                wx.cloud.uploadFile({
                                    config: {
                                        //env: 'wumei-2070bb',
                                    },
                                    cloudPath: 'zzSTNumber/' + e.detail.value.department + e.detail.value.position + e.detail.value.name + Math.floor(Math.random() * 100) + suffix, // 上传至云端的路径
                                    filePath: item, // 小程序临时文件路径
                                    success: res => {
                                        // 返回文件 ID
                                        this.setData({
                                            fileIds: this.data.fileIds.concat(res.fileID)
                                        });

                                        resolve();
                                    },
                                    fail: err => {
                                        console.error
                                        reject();
                                    }
                                })
                            }));

                        }


                        // 插入到云数据库
                        Promise.all(promiseArr).then(res => {
                            const db = wx.cloud.database({
                                //env: 'wumei-2070bb'/* 当前环境ID */
                            })
                            db.collection('zzSTNumber').add({
                                data: {
                                    _id: e.detail.value.department + e.detail.value.position + e.detail.value.name + Math.floor(Math.random() * 100),
                                    _fileIds: this.data.fileIds,
                                    _name: e.detail.value.name,
                                    _studentNumber: e.detail.value.studentNumber,
                                    _phone: e.detail.value.phone,
                                    _department: e.detail.value.department,
                                    _position: e.detail.value.position,
                                    _isPass: false,
                                    _time: new Date()
                                }
                            }).then(res => {
                                wx.hideLoading();
                                /*  wx.navigateBack({
                                     delta: 1
                                 }) */
                                wx.showToast({
                                    title: '成功',
                                    duration: 3000
                                })
                                wx.redirectTo({
                                    url: '/pages/profile/zzSTNumberInfo/zzSTNumberInfo',
                                })

                            }).catch(err => {

                            })
                        }).catch(err => {
                            wx.showToast({
                                title: '提交失败',
                                duration: 3000
                            })
                        });

                    } else if (res.cancel) {

                    }

                }

            })
        }

    },


    //上传图片
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    ChooseImage() {
        wx.chooseImage({
            count: 2, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    DelImg(e) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList
        })
    },

    onLoad: function (options) {

    },

})