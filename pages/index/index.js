//index.js
//获取应用实例
const app = getApp();

let contentNewsList;
let newsType;
let newsUrl;
let newsTitle;
let newsAuthor;
let newsid;
let source;
let newTime;
let defaultImage;

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
    topID: 1, //判断是否选中
    contentNewsList: contentNewsList,
    defaultImage: '../../image/timg.jpg', //设置默认图片
  },

  newsType: 'gn', //默认请求的是头条数据

  //headerBar点击
  headerTitleClick: function (e) {
    newsType = e.currentTarget.dataset.newstype;
    this.setData({
      topID: e.target.dataset.id,
      newsType: newsType
    })
    this.getNewsList(newsType);
  },

  //监听下拉动作
  onPullDownRefresh() {
    var topID = this.data.topID;
    var newsType = this.data.newsType;
    this.getNewsList(newsType)
  },

  onLoad: function () {
    this.getNewsList('gn', wx.stopPullDownRefresh());
  },

  //跳转到新闻详情页
  viewDetail: function (e) {
    newsid = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: '../detail/detail?id=' + newsid
    })
  },

  //获取新闻列表
  getNewsList(newType, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newType
      },
      method: 'GET',
      success: res => {
        let resultData = res.data.result;
        for (let i = 0; i < resultData.length; i++) {
          resultData[i].source = resultData[i].source == '' ? '未知来源' : resultData[i].source;
          newTime = resultData[i].date.split('T')[1].split(':')[0] + ":" + resultData[i].date.split('T')[1].split(':')[1];
          resultData[i].date = newTime;
        }
        this.setData({
          contentNewsList: resultData,
          newsType: newType
        })

      },
      complete: () => {
        callback && callback()
      }
    })
  }
})
