// pages/cart/cart.js
const {
  http
} = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [],                       // 购物车商品列表
    has_list: false,                      // 购物车是否有数据
    total_price: 0,                       // 总价，初始为0
    select_all_status: true,              // 全选状态,默认全选
    startX: 0,                            // 开始坐标X
    startY: 0,                            // 开始坐标Y
    shop_select_status: true,             // 商店选择状态
    discount_price: 0,                    // 优惠价格
    total_num: 0                          // 选择商品总数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http({
      url: "GetCartInfo",
      func: (data) => {
        var cart_len = data["cart_info"].length;
        if (cart_len != 0) {
          this.setData({
            has_list: true,
            goods_list: data.cart_info
          });
        }
        this.getTotalPrice();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
  * 自定义方法
  */

  // 手指触摸动作开始 记录起点X坐标
  touchstart(e) {
    // 开始触摸时 重置所有删除
    this.data.goods_list.forEach(function (v, i) {
      if (v.isTouchMove)    // 只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      goods_list: this.data.goods_list
    })
  },

  // 滑动事件处理
  touchmove(e) {
    var that = this,
      index = e.currentTarget.dataset.index,          // 当前索引
      startX = that.data.startX,                      // 开始X坐标
      startY = that.data.startY,                      // 开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,       // 滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,       // 滑动变化坐标
      // 获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.goods_list.forEach(function (v, i) {
      v.isTouchMove = false
      // 滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) // 右滑
          v.isTouchMove = false
        else // 左滑
          v.isTouchMove = true
      }
    });
    this.setData({
      goods_list: this.data.goods_list
    })
  },

  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  // 获取手动输入数量的值
  getInputVal(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.goods_list;
    let num = parseInt(e.detail.value);
    if (num == 0) {
      carts[index].default_num = 1;
    } else {
      carts[index].default_num = num;
    }
    this.setData({
      goods_list: this.data.goods_list
    });
    this.getTotalPrice();
  },
  // 计算总额
  getTotalPrice() {
    let carts = this.data.goods_list;                // 获取购物车列表
    let total_price = 0;
    let total_num = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                       // 判断选中才会计算价格
        total_num += parseInt(carts[i].default_num);           // 所有商品总数
        total_price += total_num * parseInt(carts[i].goods_price);      // 所有价格加起来                           
      }
    }
    this.setData({                                   // 最后赋值到data中渲染到页面
      goods_list: carts,
      total_price: total_price.toFixed(2),
      total_num: total_num
    });
  },

  // 选择商品
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.goods_list;               // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    if (!selected == false) {
      this.setData({
        shop_select_status: false,
        select_all_status: false
      });
    }
    let selected_arr = [];
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selected_arr.push(carts[i]);
      }
    }
    if (selected_arr.length == carts.length) {       // 判断当前商店中的商品是否都选中
      this.setData({
        shop_select_status: true,
        select_all_status: true
      });
    }
    this.setData({
      goods_list: carts
    });
    this.getTotalPrice();                            // 重新获取总价
  },

  // 全选
  selectAll: function (e) {
    let selectAllStatus = this.data.select_all_status;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.goods_list;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;                // 改变所有商品状态
    }
    this.setData({
      select_all_status: selectAllStatus,
      shop_select_status: selectAllStatus,
      goods_list: carts
    });
    this.getTotalPrice();                                 // 重新获取总价
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.goods_list;
    let num = parseInt(carts[index].default_num);
    num = num + 1;
    carts[index].default_num = num;
    this.setData({
      goods_list: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.goods_list;
    let num = parseInt(carts[index].default_num);
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].default_num = num;
    this.setData({
      goods_list: carts
    });
    this.getTotalPrice();
  },

  // 选择商店里的所有商品
  shopSelectAll() {
    let shop_select_status = this.data.shop_select_status;
    shop_select_status = !shop_select_status;
    let carts = this.data.goods_list;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = shop_select_status;          // 改变所有商品状态
    }
    this.setData({
      select_all_status: shop_select_status,
      shop_select_status: shop_select_status,
      goods_list: carts
    });
    this.getTotalPrice();
  },

  // 删除商品列表 
  delGoods(e) {
    var that = this;
    wx.showModal({
      content: '是否确认删除此商品？',
      success: function (res) {
        if (res.confirm) {
          const index = e.currentTarget.dataset.index;
          let carts = that.data.goods_list;
          carts.splice(index, 1);
          that.setData({
            goods_list: carts
          });
          if (!carts.length) {
            that.setData({
              hasList: false
            });
          } else {
            that.getTotalPrice();
            that.getTotalNum();
          }
        }
      }
    })
  }
})