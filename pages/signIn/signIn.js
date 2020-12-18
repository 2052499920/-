import api from '../../http/api'
import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    phone: '',
    password: '',
    hint: '',
    hint1: '',
    flagea: false,
    flageb: false,
  },
  cellphone() {  //手机登录
    this.setData({
      flag: 1
    })
  },
  mail() {  //邮箱登录
    this.setData({
      flag: 2
    })
  },
  login() {  //立即登录按钮
    let num = this.data.phone.slice(0, 2)
    let nums = this.data.phone.length
    if (nums === 0) {
      this.setData({
        hint: '手机号码不能为空'
      })
    } else if (num != 13 && num != 14 && num != 15 && num != 17 && num != 18 && num != 19 || nums !== 11) {
      this.setData({
        hint: '手机号码输入错误'
      })
    } else {
      this.setData({
        flagea: true
      })
    }
    if (this.data.password.length === 0) {
      this.setData({
        hint1: '密码不能为空'
      })
    } else {
      this.setData({
        flageb: true
      })
    }
    if (this.data.flagea && this.data.flageb) {
      api.loginCellphone(
        this.data.phone,
        this.data.password
      ).then(res => {
        // console.log(res);
        if (res.code === 200) {
          wx.setStorage({
            data: res,
            key: 'userMessage',
          })
          Notify({ type: 'success', message: '登录成功' });
          wx.reLaunch({
            url: '../home/home',
          })
        }
        else {
          Notify({ type: 'danger', message: '用户名或密码输入错误' });
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  singin() {  //立即注册
    wx.navigateTo({
      url: '../login/login',
    })
  },
  phonepic(e) {  //实时获取手机号码
    // console.log(e.detail);
    this.setData({
      phone: e.detail
    })
  },
  passwordpic(e) {
    this.setData({
      password: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  }
})