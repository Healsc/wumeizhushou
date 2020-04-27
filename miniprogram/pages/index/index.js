//index.js
const app = getApp()

Page({
  data: {
    departmentList: [{
        icon: 'cardboardfill',
        color: 'orange',
        name: '办公室',
        id: "bangongshi"
      }, {
        icon: 'discoverfill',
        color: 'yellow',
        name: '技术部',
        id: "jishubu"
      }, {
        icon: 'news',
        color: 'olive',
        name: '干训部',
        id: "ganxunbu"
      }, {
        icon: 'picfill',
        color: 'green',
        name: '宣传部',
        id: "xuanchuanbu"
      }, {
        icon: 'likefill',
        color: 'red',
        name: '舞美',
        id: "wumei"
      },
      {
        icon: 'upstagefill',
        color: 'blue',
        name: '纪检部',
        id: "jijianbu"
      }, {
        icon: 'choiceness',
        color: 'mauve',
        name: '外勤部',
        id: "waiqinbu"
      }
    ],
    noticeList: []
  },

  onLoad: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 2000);
    this.getNoticeList()
  },
  getNoticeList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getNoticeList',
      data: {
        skip: 0,
        limit: 6
      }
    }).then((res) => {
      wx.hideLoading({
        complete: (res) => {},
      })
      this.setData({
        noticeList: res.result.data
      })
      // console.log(res)
    })
  },
  goNoticeList() {
    wx.navigateTo({
      url: '/pages/notice/noticeList/noticeList',
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['cloud://production-ue9j7.7072-production-ue9j7-1301900827/gongzhonghao/gongzhonghao.png'],
      current: 'https://7072-production-ue9j7-1301900827.tcb.qcloud.la/gongzhonghao/gongzhonghao.png?sign=c66f3fe3eaaa7e8cc7247350c5092805&t=1587362686' // 当前显示图片的http链接      
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    this.onLoad();
  },
  onShareAppMessage: function () {
    return {
      title: '东农舞美助手',
      path: "/pages/index/index"
    }
  }
})