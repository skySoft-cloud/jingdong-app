//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  onLoad: function () {
    wx.request({
      url: 'https://localhost:63342/jingdong-app/test/test',
      header: {//请求头
        "Content-Type": "json"
      },
      method: 'GET',
      success: function(res){
        console.log(res)
        console.log(res.data.engineer);
        console.log(res.data.age);
      }
    })
  }
})
