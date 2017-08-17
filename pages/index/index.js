//index.js
//获取应用实例
var {
    http
    } = require('../../utils/util.js');
//使用对象解构获取全局数据
var {
    globalData
    } = getApp();

const app = getApp();

Page({
    data: {
        userInfo: {}
    },
    //事件处理函数
    onLoad: function () {
        var baseUrl = globalData.baseUrl;
        http(`${baseUrl}test`, (data) => {
            console.log(data);
        });
    }
});
