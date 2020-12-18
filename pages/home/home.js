import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    show: false,
    cookie: '',
    userMessage: '',
    showKeyword:'',
    playList: false,
    plays:[]

  },
  menu() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  search() {  //点击输入框跳转到搜索页面
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userMessage: wx.getStorageSync('userMessage')
    })
    //轮播图
    api.bannes().then(res => {
      this.setData({
        arr: res.banners
      })
    }).catch(err => {
      console.log(err);
    })
    api.default().then(res => {  //搜索默认关键字
      // console.log(res);
      this.setData({
        showKeyword: res.data.showKeyword
      })
    }).catch(err => {
      console.log(err);
    })
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