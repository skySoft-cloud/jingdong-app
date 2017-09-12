const {http} = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    // 调接口GetCoupon
    http({
      url: "GetCoupon",
      func: function(data){
        that.setData({
          couponInfo: data
        });
      }
    });
  },

  /**
   * 点击领取优惠券
   */
  tapGetCoupon: function (e) {
    const that = this,
        coupon_info = this.data.couponInfo,
        new_coupon_info = coupon_info,
        coupon_id = e.currentTarget.id;
    // 调接口GetCurCoupon
    http({
      url: "GetCurCoupon",
      // 传入当前优惠券的id
      data: {"coupon_id": coupon_id},
      func: function(data){
        // 领取优惠券成功处理
        if (data.success == "1") {
          wx.showToast({
            title: "领取优惠券成功",
            success: function(res) {
              // 遍历coupon_info
              for (let i = 0;i < coupon_info.length; i++){
                // 找到当前点击的那条数据
                if (coupon_info[i]["coupon_id"] == coupon_id) {
                  // 将当前数据的coupon_status置为1
                  new_coupon_info[i]["coupon_status"] = "1";
                }
              }
              // 重新设置couponInfo数据
              that.setData({
                couponInfo: new_coupon_info
              })
            }
          })
        } else {
          // 领取优惠券失败处理
        }
      }
    });
  },

  /**
   * 点击当前所领取的优惠券
   */
  getCouponGoods: function (e) {
    const that = this,
        coupon_info = this.data.couponInfo,
        new_coupon_info = coupon_info,
        coupon_id = e.currentTarget.id;
    // 遍历coupon_info
    for (let i = 0;i < coupon_info.length; i++){
      // 找到当前点击的那条数据
      if (coupon_info[i]["coupon_id"] == coupon_id) {
        // 若当前优惠券没有商品列表则向后台请求商品列表
        if (!coupon_info[i].hasOwnProperty("goods_list")) {
          http({
            url: "GetCouponGoods",
            // 传入当前优惠券的id
            data: {"coupon_id": coupon_id},
            func: function(data){
              // 将返回的商品列表放入new_coupon_info
              new_coupon_info[i]["goods_list"] = data["goods_list"];
              // 将当前数据的show_list取反
              new_coupon_info[i]["show_list"] = !new_coupon_info[i]["show_list"];
              // 重新设置couponInfo数据
              that.setData({
                couponInfo: new_coupon_info
              })
            }
          });
        } else {
          // 将当前数据的show_list取反
          new_coupon_info[i]["show_list"] = !new_coupon_info[i]["show_list"];
          // 重新设置couponInfo数据
          that.setData({
            couponInfo: new_coupon_info
          })
        }
      }
    }
},

  /**
   * 点击链接到当前商品的详情页
   */
toGoodsDetail: function (e) {
  wx.navigateTo({
    url: `../../cart/goods_detail/goods_detail?goods_id=${e.currentTarget.id}`
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