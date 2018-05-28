// pages/index/search/search.js
//获取应用实例，请求数据的方法
const {
    http,
    PageContent
    } = require("../../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active_search_val: "",                 //实时搜索显示
        active_search: true,                   //实时搜索推荐
        search_show_status: false,             //控制热搜和历史搜索显示
        history_show: false,                   //控制历史搜索显示隐藏
        btnsearch_status: true,                //控制显示隐藏搜索按钮
        btncancel_status: false,               //控制显示隐藏取消按钮
        cancel_icon: true,                     //searchbar关闭按钮的显示
        input_value: "",                       //初始化输入框为空
        hot_search: [],                        //热门搜索的数据
        history_search: []                     //历史搜索的数据
    },

    /**
     * 生命周期函数--监听页面加载
     * @pram options--页面跳转带来的参数
     */
    onLoad: function (options) {
        //保存this对象
        const _this = this;
        //请求热搜数据
        http({
            url: "GetSearch",
            loading: true,
            func: (data) => {
                // 成功后加载页面
                _this.initPage(data);
            }
        })
    },

    /**
     * input输入内容时cancel按钮的显示隐藏
     * @pram e 当前点击对象的属性集合
     */
    inputShow(e) {
        //输入值时
        if (e.detail.value) {
            this.setData({
                active_search_val: e.detail.value,  //当前下拉显示的实时搜索功能
                active_search: false,               //显示实时搜索的结果
                search_show_status: true,           //隐藏页面历史搜索和热门搜索
                btncancel_status: true,             //隐藏取消按钮
                btnsearch_status: false,            //显示搜索按钮
                cancel_icon: false,                 //显示关闭按钮
                input_value: e.detail.value         //设置输入框的值为当前输入的值
            })
        } else {
            this.setData({
                active_search: true,           //隐藏实时搜索的结果
                search_show_status: false,     //隐藏页面历史搜索和热门搜索
                btncancel_status: false,       //显示取消按钮
                btnsearch_status: true,        //隐藏搜索按钮
                cancel_icon: true,             //隐藏关闭按钮
                input_value: ""                //输入框的值为空
            })
        }
    },

    /**
     * 点击清除隐藏历史搜索
     */
    clearHistorySearch() {
        this.setData({
            history_show: true
        });
        //发起清除历史记录的请求
        http({
            url: "SetClearHistory",
            data: this.data.history_search,
            func: (data) => {
                //成功后弹窗提示
                wx.showToast({
                    title: "清除成功",
                    icon: "success",             //icon的类型
                    duration: 2000               //弹窗持续时长
                })
            }
        })
    },

    /**
     * 搜索按钮点击事件
     */
    searchGoods() {
        PageContent.loadNavigate(`../search_result/search_result?title=${this.data.active_search_val}`);
    },

    /**
     * input输入内容时cancel按钮的显示隐藏
     * @pram e--当前点击对象的属性集合
     */
    clearInput(e) {
        this.setData({
            active_search: true,
            cancel_icon: true,
            input_value: "",
            search_show_status: false,         //隐藏页面历史搜索和热门搜索
            btncancel_status: false,           //显示取消按钮
            btnsearch_status: true             //隐藏搜索按钮
        })
    },

    /**
     * 点击取消返回上一级
     */
    getBack() {
        // 返回上一级
        PageContent.goBack(1);
    },

    /**
     * 初始化页面
     * @pram data--页面加载的数据
     */
    initPage: function (data) {
        this.setData({
            hot_search: data["hot_search"],          //赋值请求到的值给当前page下面的data.hot_search
            history_search: data["history_search"]   //赋值请求到的值给当前page下面的data.history_search
        });
    },

    /**
     * 换一批点击事件
     */
    changeHotItems: function () {
        //保存this对象
        const _this = this;
        //请求数据
        http({
            url: "GetChangeHotSearch",
            loading: true,
            func: (data) => {
                // 成功后加载页面
                _this.initPage(data);
            }
        })
    },

    /**
     * 点击热门搜索或历史搜索字段时自动填充到搜索框
     * @pram e--当前点击对象的属性集合
     */
    fillInputValue(e) {
        this.setData({
            active_search_val: e.target.dataset.cur_value,  //设置当前搜索字段值为选中的字段值
            input_value: e.target.dataset.cur_value,        //设置选中的字段值在输入框中
            btncancel_status: true,                         //隐藏取消按钮
            btnsearch_status: false,                        //显示搜索按钮
            cancel_icon: false                              //显示关闭按钮
        })
    }
});