// pages/user_info/received_coupons/received_coupons.js
const {http} = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义头部tab信息
    navTabs: [],
    // 定义将activeIndex置为空
    activeIndex: "",
    // 定义待使用优惠券信息
    notUsedCouponInfo: [],
    // 定义已使用优惠券信息
    usedCouponInfo: [],
    // 定义已过期优惠券信息
    expiredCouponInfo: [],
    couponColor: "item['use_condition'] ? 'green-coupon' : 'red-coupon'"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 调接口GetReceivedCoupon
    http({
      url: "GetReceivedCoupon",
      func: function(data){
        // 定义渲染到视图层的数组
        let navTabs = [];
        // 将返回data重新组合
        for (let couponArr in data) {
          // 有优惠券信息，length为信息的长度，没有优惠券信息，将lengtgh置为空
          let length = data[couponArr].length > 0 ? " "+ data[couponArr].length: "";
          // 根据couponArr类型做不同字符串拼接
          if (couponArr == "not_used_coupon") {
            navTabs.push(`待使用${length}`);
          } else if (couponArr == "expired_coupon"){
            navTabs.push(`已过期${length}`);
          } else {
            navTabs.push(`已使用${length}`);
          }
        }
        that.setData({
          navTabs: navTabs,
          notUsedCouponInfo: data["not_used_coupon"],
          usedCouponInfo: data["used_coupon"],
          expiredCouponInfo: data["expired_coupon"]
        });
      }
    });
    that.setData({
      // 此处获取的activeIndex为其他页面传过来的参数用于定位优惠券类型
      activeIndex: options.activeIndex
    });
  },
  /**
   * nav item的tap事件
   */
  tapNavItem: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 点击去领取链接到领券中心
   */
  toDiscountCenter: function () {
    wx.navigateTo({
      url: "../../index/get_coupons/get_coupons"
    })
  }
})