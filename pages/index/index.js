//index.js
//获取应用实例
const app = getApp();

let contentNewsList;
let newsType;
let topPic = [
  { url: '', ID: '1' },
  { url: '', ID: '2' },
  { url: '', ID: '3' },
  { url: '', ID: '4' }
];

let newsUrl;
let newsTitle;
let newsAuthor;
let newsid;

Page({
  data: {
    headerTitleName: [
      { name: '国内', nameID: '1', newsType: 'gn' },
      { name: '国际', nameID: '2', newsType: 'gj' },
      { name: '财经', nameID: '3', newsType: 'cj' },
      { name: '娱乐', nameID: '4', newsType: 'yl' },
      { name: '军事', nameID: '5', newsType: 'js' },
      { name: '体育', nameID: '6', newsType: 'ty' },
      { name: '其他', nameID: '7', newsType: 'other' },
    ],
    topPic: topPic,
    tapID: 1, //判断是否选中
    contentNewsList: contentNewsList,
  },

  newsType: 'top', //默认请求的是头条数据

  //事件处理函数

  //headerBar 点击
  headerTitleClick: function (e) {
    let _this = this;
    newsType = e.currentTarget.dataset.newstype;
    //获取新闻
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        _this.setData({
          contentNewsList: resultData,
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },

  //跳转到新闻详情页

  viewDetail: function (e) {
    newsid = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: '../detail/detail?id=' + newsid
    })
  },

  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list?type=gn',
      data: {},
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        _this.setData({
          contentNewsList: resultData,
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },
})
