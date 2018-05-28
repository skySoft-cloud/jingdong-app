/******************************存放共通方法*********************************/
/**
 * 接口请求方法：wx.request发起的是https请求,一个微信小程序，最高并发数10个
 * @param options--调用该方法时传入的对象
 */
function http(options) {
    // 获取全局对象并进行解构
    let {globalData:{baseUrl}} = getApp();
    // 页面中若传了loading值，则showLoading
    options.loading && Modal.priLoading();
    // 发起网络请求
    wx.request({
        url: `${baseUrl}${options.url}`,
        header: {
            'content-type': 'application/xml'
        },
        data: options.data,
        //传参使用post请求，不传参使用get请求
        method: options.data ? "POST" : "GET",
        success: (res)=> {
            // 开启了loading的话先关闭loading
            options.loading && Modal.hidePriLoading();
            // 在控制台打印接口及接口的返回结果
            console.log(options.url + " is success!");
            console.log(res.data);
            //回调
            options.func(res.data);
        },
        fail: (res)=> {
            // 开启了loading的话先关闭loading
            options.loading && Modal.hidePriLoading();
            // 在控制台打印接口及接口的返回结果
            console.log(options.url + " is failed!");
            console.log(res);
        }
    })
}

/**
 * 页面Loading显示、隐藏、弹框显示
 */
var Modal = (function () {

    var priToast,       // 显示弹框Toast
        priLoading,     // 显示loading
        hidePriLoading; // 隐藏loading

    /**
     * 显示弹框
     * options 自定义配置参数
     */
    priToast = function (options) {
        // 调用api显示弹框
        wx.showToast({
            title: options.content,
            icon: options.type,
            duration: options.duration,
            mask: true
        })
    };

    /**
     *  显示loading
     */
    priLoading = function () {
        // 调用微信API显示loading
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
    };

    /**
     *  隐藏loading
     */
    hidePriLoading = function () {
        // 调用微信API隐藏loading
        setTimeout(function () {
            wx.hideLoading()
        }, 1000)
    };

    return {
        priToast: priToast,
        priLoading: priLoading,
        hidePriLoading: hidePriLoading
    }

})();

/**
 * 页面跳转方法,分为跳转page、tabBar页面，返回上一级
 */
var PageContent = (function () {

    var loadNavigate,       // 跳转非tabBar页面
        goBack,             // 返回上一级
        loadNavTabBar;      // 跳转tabBar页面

    /**
     * 跳转非tabBar页面
     * @pram url 跳转路径
     */
    loadNavigate = function (url) {
        wx.navigateTo({
            url: url
        })
    };

    /**
     * 返回上一页
     * @pram delta 跳转层数
     */
    goBack = function (delta) {
        wx.navigateBack({
            delta: delta       //返回的页面层数
        })
    };

    /**
     * 跳转tabBar页面
     * @pram url路径
     */
    loadNavTabBar = function (url) {
        wx.switchTab({
            url: url
        });
    };

    return {
        loadNavigate: loadNavigate,
        goBack: goBack,
        loadNavTabBar: loadNavTabBar
    }

})();

//暴露封装的方法
module.exports = {
    http,                              // 全局通用请求数据方法
    Modal,                            // 页面交互提示
    PageContent                      // 页面跳转相关
};