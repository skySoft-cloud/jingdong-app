// pages/index/goods_classification/goods_classification.js
//获取应用实例
const {
    http
    } = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: "搜索京东商品",
    cate_items: [],              //需要加载的商品信息
    "cur_nav": "1",              //默认选中的菜单项
    "cur_index": "0"             //默认加载的菜单数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    http({
      url: "GetClassification",
      func: (data) => {
        //请求成功后
        _this.setData({
          cate_items: data
        })
      }
    });
  },

  /**
   *进入搜索页面
   */
  goSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  /**
   * 点击左侧菜单切换
   * @pram e 当前点击对象的属性集合
   */
  switchRightTab: function (e) {
    this.setData({
      cur_nav: e.target.dataset.id,
      cur_index: e.target.dataset.index
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