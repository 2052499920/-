import api from '../../http/api'
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    textCode: '发送验证码',
    num: 60,
    flag: 1,
    phone: '',
    password: '',
    sms: '',
    hint: '',
    hint1: '',
    hint2: '',
    flagea: false,
    flageb: false,
    flageb: false,
  },
  verification() {  //发送验证码
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
      let namu = setInterval(() => {
        this.data.num -= 1
        this.setData({
          show: true,
          textCode: this.data.num + 's重新发送'
        })
        if (this.data.num === 0) {
          clearInterval(namu)
          this.setData({
            show: false,
            textCode: '发送验证码',
            num: 60
          })
        }
      }, 1000);
      api.captcha(this.data.phone).then(res => {  //发送手机验证码
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  cellphone() {  //切换手机注册
    this.setData({
      flag: 1
    })
  },
  mail() { //切换邮箱注册
    this.setData({
      flag: 2
    })
  },
  login() {   //跳转到登录页面
    wx.navigateTo({
      url: '../signIn/signIn',
    })
  },
  phonePice(e) {  //实时获取手机号
    this.setData({
      phone: e.detail
    })
  },
  passwordPice(e) { //实时获取密码
    this.setData({
      password: e.detail
    })
  },
  smsPice(e) { //实时获取验证码
    // console.log(e.detail);
    this.setData({
      sms: e.detail
    })
  },
  clearPhone() {  //手机号码清除按钮
    this.setData({
      hint: ''
    })
  },
  changePhone() {//手机号码框的change事件
    this.setData({
      hint: ''
    })
  },
  changePassword() {  //密码框的change事件
    this.setData({
      hint1: ''
    })
  },
  changeSms() {//验证码输入框的change事件
    this.setData({
      hint2: ''
    })
  },
  singin(e) {  //提交
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
        hint1: '',
        flageb: true
      })
    }
    if (this.data.sms.length === 0) {
      this.setData({
        hint2: '验证码不能为空'
      })
    } else {
      this.setData({
        hint2: '',
        flagec: true
      })
    }
    if (this.data.flagea && this.data.flageb && this.data.flagec) {
      api.phoneCheck(this.data.phone).then(res => {
        console.log(res);
        if (res.exist > 0) {
          Toast('手机号已注册，您可以直接登录')
        } else {
          api.verify(
            this.data.phone,
            this.data.sms
          ).then(res => {
            if (res.code === 200) {
              api.singCellphone(
                this.data.sms,
                this.data.phone,
                this.data.password,
                this.data.phone
              ).then(res => {
                console.log(res);
              }).catch(err => {
                console.log(err);
              })
            }
          }).catch(err => {
            console.log(err);
            Toast('验证码输入错误')
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
    // console.log(this.data.phone, this.data.password, this.data.sms);
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