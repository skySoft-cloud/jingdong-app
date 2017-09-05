//获取应用实例
const {
    http
    } = require('../../utils/util.js');
Page({
    data: {
        num: 1,
        products_data: {}
    },
    //事件处理函数
    onLoad: function () {
        const _this = this;
        http({
            url: "GetSeckillProducts",
            func: (data) => {
                _this.initPage(data);
            }
        });
    },

    /**
     * 初始化页面
     */
    initPage: function (data) {
        this.setData({
            products_data: data
        });
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
    },

    /**
     * 点击商品进入商品对应的详情页
     * @pram e 当前点击对象的属性集合
     */
    goDetail: (e)=> {
        wx.navigateTo({
            url: `goods_detail/goods_detail?product_id=${e.currentTarget.dataset.id}` //将该商品的id传到详情页
        })
    }
});
