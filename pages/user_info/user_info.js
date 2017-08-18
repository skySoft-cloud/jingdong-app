const app = getApp();
const tapItemArray = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
      wechatInfo: {}
  },
    /**
     * 点击链接到订单详情页
     */
  tapMyOrder: () => {
      wx.navigateTo({
          url: "../user_info/my_order/my_order"
      })
  },
    /**
     * 点击链接到待付款页面
     */
    tapUnpaidOrder: () => {
        wx.navigateTo({
            url: "../user_info/unpaid_order/unpaid_order"
        })
    },
    /**
     * 点击链接到待收货页面
     */
    tapNotReceived: () => {
        wx.navigateTo({
            url: "../user_info/not_received/not_received"
        })
    },
    /**
     * 点击弹出售后订单后台设置详情
     */
    tapPaidOrder: () => {

    },
    /**
     * 点击链接到优惠券页面
     */
    tapDiscountedOrder: () => {
        wx.navigateTo({
            url: "../user_info/discount_order/discount_order"
        })
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