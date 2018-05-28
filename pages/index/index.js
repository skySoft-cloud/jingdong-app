//获取应用实例，请求数据的方法
const {
    http,
    PageContent
    } = require("../../utils/util.js");

Page({
    data: {
        num: 1,                   //默认选中抢购的第一项
        products_data: {},        //页面秒杀商品的信息
        is_hide_loadmore: true    //控制加载更多的显示
    },

    /**
     * 页面加载时
     */
    onLoad: function () {
        //保存this对象
        const _this = this;
        //请求数据
        http({
            url: "GetSeckillProducts",
            loading: true,
            func: (data) => {
                // 成功后加载页面
                _this.initPage(data["products_data"]);
            }
        });
    },

    /**
     * 初始化页面
     * @pram data--页面加载的数据
     */
    initPage: function (data) {
        this.setData({
            products_data: data
        });
    },

    /**
     * 点击抢购的时间切换样式
     * @pram e--当前点击对象的属性集合
     */
    clickNum: function (e) {
        if (e.target.dataset.num) {
            //设置当前点击的项为选中样式
            this.setData({
                num: e.target.dataset.num
            })
        }
    },

    /**
     * 点击searchbar进入搜索页面
     */
    goSearchPage: function () {
        // 跳转到search页面
        PageContent.loadNavigate("search/search");
    },

    /**
     * 点击商品进入商品对应的详情页
     * @pram e--当前点击对象的属性集合
     */
    goDetail: (e) => {
        // 带上商品id跳转商品详情页
        PageContent.loadNavigate(`../cart/goods_detail/goods_detail?product_id=${e.currentTarget.dataset.id}`);
    },

    /**
     * 下拉加载更多
     */
    onReachBottom: function () {
        //保存this对象
        const _this = this;
        //页面已存在的商品数据
        let exsit_data = _this.data.products_data,
            products_data;
        //请求数据
        http({
            url: "GetSeckillProducts",
            loading: true,
            func: (data) => {
                //合并已有的数据和请求到加载更多的数据
                products_data = [...exsit_data, ...data["products_data"]];
                // 成功后加载页面
                _this.setData({
                    products_data: products_data,
                    is_hide_loadmore: false
                });
            }
        });
    }
});
