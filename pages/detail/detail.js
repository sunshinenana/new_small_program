var app = getApp();
let newsTitle;
let newsid;
let newContent;
let newImage;
let newSource;
let newDate;
let source;
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
        // for (let i = 0; i < contentAr.length; i += 1) {
        //   if (contentAr[i]['type'] == 'image') {
        //     newContent += "<" + contentAr[i]['type'] + " src='" + contentAr[i]['src']+"'>";
        //   } else {
        //     newContent += "<" + contentAr[i]['type'] + ">" + contentAr[i]['text'] + "</" + contentAr[i]['type'] + ">";
        //   }
        // }
        console.log(resultDetail);
        source = resultDetail.source == '' ? '未知来源' : resultDetail.source;
        _this.setData({
          newsTitle: resultDetail.title,
          newContent: contentAr,
          newSource: source
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