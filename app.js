//app.js
/******************************存放全局变量*********************************/ 
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
        // 和baron接口调试置为true用前者baseUrl;本地接口调试置为false,使用后者baseUrl
        baseUrl: false ? "http://10.8.6.107:8080/wx/" : "https://localhost:63342/jingdong-app/test/"
    }
});
