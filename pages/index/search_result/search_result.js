// pages/index/search_result/search_result.js
//获取应用实例，请求数据的方法
const {
    http
    } = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_data:[],   //页面加载用的数据
    input_value: ""  //输入框显示的文本
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    //根据页面跳转带来的搜索条件发起请求
    http({
      url: "GetSearchResult",
      data: { title: options.title },
      func: (data) => {
        _this.setData({
          search_data:data["search_products"]
        })
      }
    })
    //输入框默认显示为页面跳转传递过来的数据
    this.setData({
      input_value: options.title
    })
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