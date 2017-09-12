/******************************存放共通方法*********************************/
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

/**
 * 接口请求方法：wx.request发起的是https请求,一个微信小程序，最高并发数10个
 * @param options--调用该方法时传入的对象
 */
function http(options) {
    // 获取全局对象并进行解构
    let {globalData:{baseUrl}} = getApp();
    wx.request({
        url: `${baseUrl}${options.url}`,
        header: {
            'content-type': 'application/xml'
        },
        data: options.data,
        //传参使用post请求，不传参使用get请求
        method: options.data ? "POST" : "GET",
        success: (res)=> {
            // 在控制台打印接口及接口的返回结果
            console.log(options.url);
            console.log(res.data);
            //回调
            options.func(res.data);
        }
    })
}

//暴露封装的方法 
module.exports = {
    formatTime: formatTime,
    http                              //全局通用请求数据方法
};