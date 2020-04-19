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
  },

  onLoad: function () {

  },



})