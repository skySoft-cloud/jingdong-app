//获取应用实例
const {
    http
    } = require('../../utils/util.js');
Page({
    data: {},
    //事件处理函数
    onLoad: function () {
        http({
            url: "test",
            func: (data) => {
                console.log(data);
            }
        });
    }
});
