import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carousel: [],
    carousela: [],
    autoplay: false,
    duration: 500,
    circular: true,
    current: 0
  },
  add(e) {
    // console.log(e);
    this.data.carousel.unshift(this.data.carousel[2])
    this.data.carousel.pop()
    this.setData({
      carousel: this.data.carousel
    })
  },
  change(e) {
    this.setData({
      current: e.detail.current
    })
  },
  click(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.item);
    api.playlistDetail(e.currentTarget.dataset.item.id).then(res => {
      wx.setStorage({
        data: res.playlist.trackIds,
        key: 'musics',
      })
      let activeIndex = 0
      wx.setStorage({
        data: activeIndex,
        key: 'activeIndex',
      })
      wx.navigateTo({
        url: '../playMusic/playMusic',
      })
    })
  },
  playlista(e) {
    console.log(e.currentTarget.dataset.item);
    api.playlistDetail(e.currentTarget.dataset.item.id).then(res => {
      wx.setStorage({
        data: res.playlist.trackIds.slice(0,20),
        key: 'musics',
      })
      let activeIndex = 0
      wx.setStorage({
        data: activeIndex,
        key: 'activeIndex',
      })
      wx.navigateTo({
        url: '../playMusic/playMusic',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.playlist().then(res => {
      console.log(res);
      res.playlists.map(item => {
        if ((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10000 > 1000) {
          item.playCount = parseInt(item.playCount / 10000) + '.' + parseInt((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10) + '万'
        } else {
          item.playCount = parseInt(item.playCount / 10000) + '万'
        }
      })
      this.setData({
        carousel: res.playlists.slice(0, 3),
        carousela: res.playlists.slice(3)
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