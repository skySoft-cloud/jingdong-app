// pages/index/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cancel_icon: true,
        input_value:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
    },

    /**
     * input输入内容时cancel按钮的显示隐藏
     */
    inputShow(e){
        if (e.detail.value) {
            this.setData({
                cancel_icon: false,
                input_value:e.detail.value
            })
        } else {
            this.setData({
                cancel_icon: true,
                input_value:""
            })
        }
    },

    /**
     * input输入内容时cancel按钮的显示隐藏
     */
    clearInput(e){
      this.setData({
          cancel_icon: true,
          input_value:""
      })
    },


    /**
     * 点击取消返回上一级
     */
    getBack(){
        wx.navigateBack({
            delta: 1
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