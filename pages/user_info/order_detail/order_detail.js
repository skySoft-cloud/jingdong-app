const {http} = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 初始化当前订单详情
        cur_order_detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this,
        // 获取order ID
            order_id = options.order_id;
        // 调接口GetOrderDetail
        http({
            url: "GetOrderDetail",
            data: {"order_id": order_id},
            func: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["order_id"] == order_id) {
                        // 将获取的当前订单详情赋值给cur_order_detail
                        console.log(data[i]);
                        that.setData({
                            cur_order_detail: data[i]
                        });
                    }
                }
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