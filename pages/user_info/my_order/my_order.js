// pages/user_info/my_order/my_order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navTabs: ["全部订单", "待付款", "待收货"],
        activeIndex: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * nav item的tap事件
     */
    tapNavItem: function (e) {
        this.setData({
            activeIndex: e.currentTarget.id
        });
    }
})