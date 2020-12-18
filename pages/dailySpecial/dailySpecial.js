import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //播放全部
  playAll() {
    wx.navigateTo({
      url: '../playMusic/playMusic',
    })
    let activeIndex = 0
    wx.setStorage({
      data: activeIndex,
      key: 'activeIndex',
    })
    wx.setStorage({
      data: this.data.arr,
      key: 'musics',
    })
  },
  //播放单首
  play(e) {
    let arr = []
    arr.push(e.currentTarget.dataset.item)
    wx.setStorage({
      data: arr,
      key: 'musics',
    })
    wx.navigateTo({
      url: `../playMusic/playMusic`,
    })
    let activeIndex = 0
    wx.setStorage({
      data: activeIndex,
      key: 'activeIndex',
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
    let cookie = wx.getStorageSync('userMessage')
    // console.log(cookie.cookie);
    api.recommendSongs(cookie.cookie).then(res=>{
      console.log(res);
      this.setData({
        arr:res.data.dailySongs
      })
    }).catch(err=>{
      console.log(err);
    })
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