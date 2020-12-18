import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vlaue: '',
    search: [],
    active: 1,
    show:true
  },
  cancel() {  //取消按钮，跳回首页
    wx.navigateTo({
      url: '../home/home',
    })
  },
  change(e) {  //模糊搜索
    if (e.detail) {
      api.suggest(e.detail).then(res => {
        this.setData({
          search: res.result.allMatch,
          value: e.detail
        })
      }).catch(err => {
        console.log(err);
      })
    } else {
      this.setData({
        search: []
      })
      wx.reLaunch({
        url: '../search/search',
      })
    }
  },
  search() {  //ent事件
    if (this.data.value) {
      wx.navigateTo({
        url: `../search-listings/search-listings?search=${this.data.value}`,
      })
      if (wx.getStorageSync('history').length > 0) {
        let arrs = wx.getStorageSync('history')
        arrs.push(this.data.value)
        arrs = Array.from(new Set(arrs))
        this.setData({
          history: arrs
        })
        wx.setStorage({
          data: arrs,
          key: 'history',
        })
      } else {
        let arr = []
        arr.push(this.data.value)
        this.setData({
          history: arr
        })
        wx.setStorage({
          data: arr,
          key: 'history',
        })
      }
    }
  },
  input() {
    api.suggest(this.data.value).then(res => {
      this.setData({
        search: res.result.allMatch,
        show:false
      })
    }).catch(err => {
      console.log(err);
    })
  },
  clear() {  //清空按钮
    this.setData({
      search: []
    })
    wx.reLaunch({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      value: wx.getStorageSync('search')
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