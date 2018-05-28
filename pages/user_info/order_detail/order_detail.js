const {http,PageContent} = require('../../../utils/util.js');
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
            loading: true,
            data: {"order_id": order_id},
            func: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["order_id"] == order_id) {
                        // 将获取的当前订单详情赋值给cur_order_detail
                        that.setData({
                            cur_order_detail: data[i]
                        });
                    }
                }
            }
        });
    },

    /**
     * tap申请取消订单
     */
    cancelOrderDlg: function(){
        const that = this;
        // 获取data中的cur_order_detail
        const cur_order_detail = this.data.cur_order_detail;
        // 将order_status状态设为1，即订单取消的状态
        cur_order_detail.order_status = "1";
        wx.showModal({
            title: `是否申请取消订单？`,
            confirmText: "确定",
            confirmColor: "#E45050",
            success: function (res) {
                // 点确定将页面设为订单取消的状态
                if (res.confirm) {
                    that.setData({
                        cur_order_detail: cur_order_detail
                    });
                }
            }
        });
    },

    /**
     * 点击某一商品链接到该商品的详情页
     */
    toGoodsDetail: (e) => {
        // 获取当前订单的ID作为值传入url中
        const goods_id = e.currentTarget.id;
        PageContent.loadNavigate(`../../cart/goods_detail/goods_detail?goods_id=${goods_id}`);
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
});