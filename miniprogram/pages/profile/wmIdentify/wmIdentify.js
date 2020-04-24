const app = getApp();

Page({
    data: {
        wumeiInfo: {},
        index: null,
        imgList: [],
        fileIds: [],
        multiIndex: [0, 0],
        multiArray: [
            ['办公室', '技术部', '干训部', '宣传部', '纪检部', '外勤部', '会长团'],
            ['干事', '副主任', '主任'],
        ],
        objectMultiArray: [
            [{
                    id: 0,
                    name: '办公室'
                },
                {
                    id: 1,
                    name: '技术部'
                },
                {
                    id: 2,
                    name: '干训部'
                },
                {
                    id: 3,
                    name: '宣传部'
                },
                {
                    id: 4,
                    name: '纪检部'
                },
                {
                    id: 5,
                    name: '外勤部'
                },
                {
                    id: 6,
                    name: '会长团'
                }
            ],
            [{
                    id: 0,
                    name: '干事'
                },
                {
                    id: 1,
                    name: '副部长'
                },
                {
                    id: 2,
                    name: '部长'
                },
                {
                    id: 3,
                    name: '会长'
                },
                {
                    id: 4,
                    name: '执行会长'
                }
            ]
        ]
    },

    //所属部门
    MultiChange(e) {
        this.setData({
            multiIndex: e.detail.value
        })
    },
    MultiColumnChange(e) {
        let data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['干事', '副主任', '主任'];
                        break;
                    case 1:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 1:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 2:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 3:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 4:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 5:
                        data.multiArray[1] = ['干事', '副部长', '部长'];
                        break;
                    case 6:
                        data.multiArray[1] = ['会长', '执行会长'];
                        break;
                }
                data.multiIndex[1] = 0;
                break;

        }
        this.setData(data);
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
        this.setData({
            wumeiInfo: e.detail.value,
        })
        if (this.data.wumeiInfo.name == "" || this.data.wumeiInfo.sex == "" ||
            this.data.wumeiInfo.studentNumber == "" || this.data.wumeiInfo.academy == "" ||
            this.data.wumeiInfo.major == "" || this.data.wumeiInfo.phone == "") {
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {

                }

            })
        } else if (!this.ischina(this.data.wumeiInfo.name)) {
            wx.showModal({
                title: '',
                content: '姓名有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isSNo(this.data.wumeiInfo.studentNumber)) {
            wx.showModal({
                title: '',
                content: '学号有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.ischina(this.data.wumeiInfo.academy)) {
            wx.showModal({
                title: '',
                content: '学院有误！',
                cancelText: '退出',
                confirmText: '继续',
            })
        } else if (!this.isTelCode(this.data.wumeiInfo.phone)) {
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
                                    cloudPath: 'wumeiNumber/' + this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] + Math.floor(Math.random() * 100) + suffix, // 上传至云端的路径
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
                        this.setData({
                            //设置时间 数据库增加个time字段为提交时间
                            time: this.getDate()
                        })

                        // 插入到云数据库
                        Promise.all(promiseArr).then(res => {
                            const db = wx.cloud.database({
                                //env: 'wumei-2070bb'/* 当前环境ID */
                            })
                            db.collection('wumeiNumber').add({
                                data: {
                                    _id: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] + this.data.wumeiInfo.name,
                                    _fileIds: this.data.fileIds,
                                    _name: this.data.wumeiInfo.name, //协会成员姓名
                                    _sex: this.data.wumeiInfo.sex, //性别
                                    _studentNumber: this.data.wumeiInfo.studentNumber, //学号
                                    _academy: this.data.wumeiInfo.academy, //学院
                                    _major: this.data.wumeiInfo.major, //专业
                                    _phone: this.data.wumeiInfo.phone, //联系方式手机
                                    _department: this.data.multiArray[0][this.data.multiIndex[0]], //所在部门
                                    _position: this.data.multiArray[1][this.data.multiIndex[1]], //职务
                                    _isWM: false,
                                    _time: this.data.time, //提交时间
                                    _is1: 1,
                                    _is2: 0,
                                    _isAdmin: false,
                                    _isSuperAdmin: false
                                }
                            }).then(res => {
                                wx.hideLoading();
                                wx.navigateBack({
                                    delta: 1
                                })
                            }).catch(err => {

                            })
                        }).catch(err => {
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
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
        wx.showModal({
            title: '',
            content: '确定要删除这张照片？',
            cancelText: '否',
            confirmText: '是',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },

    onLoad: function (options) {

    },
    //获取系统时间
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
    }
})