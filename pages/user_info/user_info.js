const app = getApp();
const tapItemArray = [];
const {http} = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      wechatInfo: {},       // 初始化账户信息，包括头像、昵称等
      allOrders: "",        // 初始化订单数量
      unpaidOrder: "",      // 初始化待付款订单数量
      notReceivedOrder: "", // 初始化待收货订单数量
      discountCard: ""      // 初始化优惠券数量
  },
    /**
     * 点击弹出售后订单后台设置提示
     */
    tapPaidOrder: () => {
        wx.showModal({
            title: `请至"微信-发现-购物-个人中心"进行售后订单管理`,
            confirmText: "知道了",
            confirmColor: "#E45050",
            showCancel: false,
            success: function (res) {

            }
        });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      const that = this;
      // 调用getWechatInfo获取userInfo
      app.getWechatInfo(function (userInfo) {
          //更新数据
          that.setData({
              wechatInfo: userInfo
          });
          console.log(userInfo)
      });
      // 调接口GetOrderNum
      http({
          url: "GetOrderNum",
          func: function(data){
              that.setData({
                  allOrders: data["all_orders"] ? data["all_orders"]+"单" : "",
                  unpaidOrder: data["unpaid_order"] ? data["unpaid_order"]+"单" : "",
                  notReceivedOrder: data["not_received_order"] ? data["not_received_order"]+"单" : "",
                  discountCard: data["discount_card"] ? data["all_orders"]+"单" : ""
              });
          }
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