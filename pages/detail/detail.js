var app = getApp();
let newsTitle;
let newsid;
let newContent;
let newImage;
let newSource;
let newDate;
let source;
let newTime;
Page({
  data: {
    msgDetail: {}
  },
  
  onLoad: function (options) {
    let _this = this;
    newsid = options.id;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: newsid
      },
      method: 'GET',
      success: res => {
        let resultDetail = res.data.result;
        let contentAr = resultDetail.content;
        newContent = '';
        source = resultDetail.source == '' ? '未知来源' : resultDetail.source;

        newTime = resultDetail.date.split('T')[1].split(':')[0] + ":" + resultDetail.date.split('T')[1].split(':')[1];

        _this.setData({
          newsTitle: resultDetail.title,
          newContent: contentAr,
          newSource: source,
          newDate: newTime
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  }
})  