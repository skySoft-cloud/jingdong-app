// pages/index/search/search.js
//获取应用实例，请求数据的方法
const {
    http
    } = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancel_icon: true,  //searchbar关闭按钮的显示
    input_value: "",    //初始化输入框为空
    hot_search: []      //热门搜索的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //保存this对象
    const _this = this;
    //请求数据
    http({
      url: "GetHotSearch",
      func: (data) => {
        // 成功后加载页面
        _this.initPage(data);
      }
    });
  },

  /**
   * input输入内容时cancel按钮的显示隐藏
   * @pram e 当前点击对象的属性集合
   */
  inputShow(e) {
    //输入值时
    if (e.detail.value) {
      this.setData({
        cancel_icon: false,         //显示关闭按钮
        input_value: e.detail.value //设置输入框的值为当前输入的值 
      })
    } else {
      this.setData({
        cancel_icon: true,          //隐藏关闭按钮
        input_value: ""             //输入框的值为空
      })
    }
  },

  /**
   * input输入内容时cancel按钮的显示隐藏
   * @pram e 当前点击对象的属性集合
   */
  clearInput(e) {
    this.setData({
      cancel_icon: true,
      input_value: ""
    })
  },

  /**
   * 点击取消返回上一级
   */
  getBack() {
    wx.navigateBack({
      delta: 1       //返回的页面层数
    })
  },

/**
 * 初始化页面
 * @pram data 页面加载的数据
 */
  initPage: function (data) {
    this.setData({
      hot_search: data["hot_search"]  //赋值请求到的值给当前page下面的data.hot_search
    });
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