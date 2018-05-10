var app = getApp();
let newsTitle;
let newsid;
let newsContent;
let newImage;
let newSource;
let newDate;
let source;
let newTime;
Page({
  data: {
    msgDetail: {},
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
        let newContent = [];
        source = resultDetail.source == '' ? '未知来源' : resultDetail.source;

        newTime = resultDetail.date.split('T')[1].split(':')[0] + ":" + resultDetail.date.split('T')[1].split(':')[1];
        for (let i = 0; i < contentAr.length; i++) { 
          let ctype = contentAr[i]['type'];
          if(ctype == 'image') {
            this.setImage(contentAr[i], newContent);
          } else {
            this.setText(contentAr[i], newContent);
          }
        }
        console.log(newContent);
        _this.setData({
          newsTitle: resultDetail.title,
          newsContent: newContent,
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
  setImage: function (contentArr, newContentArr) {
    newContentArr.push({
      nodes: [{
        name: 'img',
        attrs: {
          src: contentArr.src,
          height: '100%',
          width: '100%'
        },
      }]
    });
  }, 
  setText: function (contentArr, newContentArr) {
    newContentArr.push({
      nodes: [{
        name: contentArr.type,
        children: [{
          type: 'text',
          text: contentArr.text
        }],
      }]
    });
  }, 
})  