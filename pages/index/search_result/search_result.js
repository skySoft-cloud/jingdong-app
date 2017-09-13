// pages/index/search_result/search_result.js
//获取应用实例，请求数据的方法
const {
    http
} = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    normal_arrow: true,                  //价格灰色icon的显示
    arrow_selected: false,               //价格红色icon的显示
    num: 2,                              //控制选中筛选的条件样式
    search_data: [],                     //页面加载用的数据
    input_value: ""                      //输入框显示的文本
  },

  /**
   * 生命周期函数--监听页面加载
   * @pram options--页面跳转带来的参数
   */
  onLoad: function (options) {
    const _this = this;
    //根据页面跳转带来的搜索条件发起请求
    http({
      url: "GetSearchResult",
      data: { title: options.title },     //查询的具体商品
      //成功后处理
      func: (data) => {
        _this.setData({
          search_data: data["search_products"]
        })
      }
    })
    //输入框默认显示为页面跳转传递过来的数据
    this.setData({
      input_value: options.title
    })
  },

  /**
   * 筛选条件点击事件
   *@pram e--事件源自身携带的属性集合
   */
  changeFilterRules(e) {
    //根据查询条件重新渲染页面
    this.initPageByFilter(e.target.id);
    this.setData({
      num: e.target.dataset.num
    })
  },

  /**
   * 根据筛选条件渲染页面
   *@pram e--事件源自身携带的属性集合
   */
  initPageByFilter(search_type) {
    const _this = this;
    //根据页面选择的搜索条件进行处理
    switch (search_type) {
      //查询综合的商品信息
      case "comprehensive":
        http({
          url: "GetSearchRulesByComprehensive",
          data: { id: search_type },
          //成功后处理
          func: (data) => {
            _this.setData({
              search_data: data["search_products"]
            })
          }
        })
        break;
      //根据销量请求商品信息
      case "sales":
        http({
          url: "GetSearchRulesBySale",
          data: { id: search_type },
          func: (data) => {
            _this.setData({
              search_data: data["search_products"]
            })
          }
        })
        break;
    }
  },

  /**
   * 价格从最低到最高排列
   */
  lowToHighPrice() {
    const _this = this;
    //发起请求
    http({
      url: "GetPriceByLowToHigh",
      func: (data) => {
        _this.setData({
          search_data: data["search_products"],
          normal_arrow: false,                   //下箭头显示灰色
          arrow_selected: true,                  //上箭头显示红色
        })
      }
    })
  },

  /**
   * 价格从最高到最低排列
   */
  HighToLowPrice() {
    const _this = this;
    //发起请求
    http({
      url: "GetSearchResult",
      func: (data) => {
        _this.setData({
          search_data: data["search_products"],
          normal_arrow: true,                    //上箭头显示灰色
          arrow_selected: false,                 //下箭头显示红色
        })
      }
    })
  },

  /**
   * 点击筛选条件弹框
   */
  waitTodo() {
    wx.showToast({
      title: "暂时还没有做哦",
      icon: "loading",
      duration: 2000
    })
  },

  /**
   * 点击商品进入详情页
   */
  goDetail(e){
    wx.navigateTo({
      url: '../../cart/goods_detail/goods_detail',
    })
  }
})