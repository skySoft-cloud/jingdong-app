function formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}

//全局共通方法
function http(url,callback,data) {
    //发送请求
    //wx.request发起的是https请求,一个微信小程序，同时只能有5个网络请求连接
    wx.request({
        url,
        method : data ? "POST" : "GET",
        header: {
            'content-type': 'application/xml'
        },
        success: (res)=> {
            //回调
            callback(res.data)
        }
    })
}
module.exports = {
    formatTime: formatTime,
    http
};