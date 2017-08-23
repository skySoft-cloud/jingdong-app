// pages/user_info/my_order/my_order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navTabs: ["全部订单", "待付款", "待收货"],
        // 初始化将activeIndex置为空
        activeIndex: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            // 此处获取的activeIndex为user_info页面navigator传过来的参数
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
    }
})