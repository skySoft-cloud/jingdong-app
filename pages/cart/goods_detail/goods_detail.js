// pages/goods_detail/goods_detail.js
const {
    http,PageContent
    } = require('../../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper_attrs: {
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            indicator_color: "#848689",
            indicator_active_color: "#f23030"
        },
        goods_detail: [],
        cart_num: 0,
        has_cart: false,
        total_num: 0,
        cart_arr: [],
        goods_id: "",
        default_num: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http({
            url: "GetGoodsDetail",
            data: options.product_id,
            func: (data) => {
                this.setData({
                    goods_detail: data.goods_detail,
                    goods_id: options.product_id
                });
            }
        });
        let arr = wx.getStorageSync('cart');
        let total_cart_count = 0;
        if (arr.length > 0) {
            for (let i in arr) {
                total_cart_count += parseInt(arr[i].count);
            }
            this.setData({
                has_cart: true,
                cart_num: total_cart_count,
                cart_arr: arr
            });
        }

    },

    minusCount: function (e) {
        let goods_detail = this.data.goods_detail;
        let num = parseInt(goods_detail.count);
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        goods_detail.count = num;
        this.setData({
            goods_detail: goods_detail
        });
    },
    addCount: function (e) {
        let goods_detail = this.data.goods_detail;
        let num = parseInt(goods_detail.count);
        num = num + 1;
        goods_detail.count = num;
        this.setData({
            goods_detail: goods_detail
        });
    },
    getInputVal: function (e) {
        let goods_detail = this.data.goods_detail;
        let num = parseInt(e.detail.value);
        if (num == 0) {
            goods_detail.count = 1;
        } else {
            goods_detail.count = num;
        }
        this.setData({
            goods_detail: goods_detail
        });
    },
    addToCart: function (e) {
        let cart_num = this.data.cart_num;
        let cart_arr = this.data.cart_arr;
        this.setData({
            cart_num: cart_num + 1
        });
        this.data.goods_detail.count = 1;
        if (this.data.has_cart) {
            for (var i in cart_arr) {
                // 判断购物车内的item的id，和事件传递过来的id，是否相等
                if (cart_arr[i].id == this.data.goods_id) {
                    // 相等的话，给count+1（即再次添加入购物车，数量+1）
                    cart_arr[i].count = cart_arr[i].count + 1;
                    // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）
                    try {
                        wx.setStorageSync('cart', cart_arr)
                    } catch (e) {
                        console.log(e)
                    }
                    // 返回（在if内使用return，跳出循环节约运算，节约性能）
                    return;
                }
            }
            // 遍历完购物车后，没有对应的item项，把当前项放入购物车数组
            cart_arr.push(this.data.goods_detail);
        } else {
            // 购物车没有数据，把item项push放入当前数据（第一次存放时）
            cart_arr.push(this.data.goods_detail);
        }
        // 最后，把购物车数据，存放入缓存
        try {
            wx.setStorageSync('cart', cart_arr)
            this.setData({
                has_cart: true
            });
            // 显示提示信息
            wx.showToast({
                title: '添加成功'
            });
            // 返回（在if内使用return，跳出循环节约运算，节约性能）
            return;
        } catch (e) {
            console.log(e);
        }

    },
    toCartPage: function (e) {
        PageContent.loadNavTabBar("../cart");
    }
});