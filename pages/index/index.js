//获取应用实例
const {
    http
    } = require('../../utils/util.js');
Page({
    data: {
        num: 0,
        products_data: {}
    },
    //事件处理函数
    onLoad: function () {
        const _this = this;
        /*请求假数据demo*/
        http({
            url: "GetSeckillProducts",
            func: (data) => {
                _this.initPage(data);
            }
        });
        this.selectDefaultTimeItem();
    },

    /**
     * 初始化页面
     */
    initPage: function (data) {
        this.setData({
            products_data: data
        });
        console.log(this.data.products_data)
    },

    /*页面初始化加载默认选中进行中的抢购条目*/
    selectDefaultTimeItem: function () {
        this.setData({
            num: 1
        })
    },
    /**
     * 点击抢购的时间切换样式
     */
    clickNum: function (e) {
        this.setData({
            num: e.target.dataset.num
        })
    },
    /**
     * 点击searchbar进入搜索页面
     */
    goSearchPage: function () {
        wx.navigateTo({
            url: "search/search"
        })
    }
});
