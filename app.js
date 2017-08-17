//app.js
App({
    /**
     * 获取用户信息，供各页面调用
     */
    getWechatInfo:function(callback){
        const that = this;
        // 1. 若全局userInfo存在，直接调用回调函数
        if(this.globalData.userInfo){
            typeof callback == "function" && callback(this.globalData.userInfo);
        }
        // 2. 若全局userInfo不存在，用wx.getUserInfo获取userInfo保存到全局
        else{
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof callback == "function" && callback(that.globalData.userInfo);
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        baseUrl: "https://localhost:63342/jingdong-app/test/"
    }
});
