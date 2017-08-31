// pages/index/goods_classification/goods_classification.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeholder: "请搜索商品",
        static_show: false,
        input_show: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 聚焦时清空input
     */
    clearInput: function (e) {
        this.setData({
            placeholder: "",
            input_show: false,
            static_show: true
        })
    },
    /**
     * 失去焦点时恢复
     */
    recoverPlaceholder: function () {
        this.setData({
            placeholder: "请搜索商品",
            input_show: true,
            static_show: false
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