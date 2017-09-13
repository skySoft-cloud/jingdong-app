// pages/index/goods_classification/goods_classification.js
//获取应用实例
const {
    http
} = require("../../../utils/util.js");
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
   * @pram options--页面跳转带来的参数
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
      url: "../search/search"
    })
  },

  /**
   * 点击左侧菜单切换
   * @pram e--当前点击对象的属性集合
   */
  switchRightTab: function (e) {
    this.setData({
      cur_nav: e.target.dataset.id,
      cur_index: e.target.dataset.index
    })
  },

  /**
   * 点击商品进入详情
   * @pram e--当前点击对象的属性集合
   */
  goDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: "../../cart/goods_detail/goods_detail"
    })
  }
})