// pages/user_info/my_order/my_order.js
const {http} = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navTabs: ["全部订单", "待付款", "待收货"],
        // 初始化将activeIndex置为空
        activeIndex: "",
        // 初始化将paidOrder置为空数组
        paidOrder: [],
        // 初始化将unpaidOrder置为空数组
        unpaidOrder: [],
        // 初始化将allOrder置为空数组
        allOrder: []

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        // 调接口GetReceivedCoupon
        http({
            url: "GetMyOrder",
            loading: true,
            func: function (data) {
                // 定义unpaidOrder和canceledOrder
                let unpaidOrder = [],
                    paidOrder = [];
                // 遍历data，将数据重新组合
                for (let i = 0; i < data.length; i++) {
                    // 订单状态为0，为待付款订单，加入unpaidOrder
                    if (data[i]["order_status"] == "0") {
                        unpaidOrder.push(data[i]);
                    }
                    // 订单状态为2，为已支付，paidOrder
                    if (data[i]["order_status"] == "2") {
                        paidOrder.push(data[i]);
                    }
                }
                that.setData({
                    allOrder: data,
                    unpaidOrder: unpaidOrder,
                    paidOrder: paidOrder
                });
            }
        });
        that.setData({
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
    },

    /**
     * tap当前订单去当前订单详情页
     */
    showOrderDetail: function (e) {
        // 获取当前订单的ID作为值传入url中
        const order_id = e.currentTarget.id;
        wx.redirectTo({
            url: `../order_detail/order_detail?order_id=${order_id}`
        })
    }
})