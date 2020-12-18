import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playVideo: '',
    show: true,
    videoDetail: '',
    danmulist: [],
  },
  play() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.vid);
    api.playVideo(options.vid).then(res => {  //视频地址
      // console.log(res);
      this.setData({
        playVideo: res.urls[0].url
      })
    }).catch(err => {
      console.log(err);
    })

    api.videoDetail(options.vid).then(res => {  //视频详情
      console.log(res.data)
      if (res.data.playTime > 10000) {
        res.data.playTime = parseInt(res.data.playTime / 10000) + '万次观看'
      }
      this.setData({
        videoDetail: res.data
      })
    }).catch(err => {
      console.log(err);
    })

    api.videoComment(options.vid).then(res => {  //视频评论
      console.log(res)
      let arr = []
      let num = 0
      res.hotComments.map((item, index) => {
        let obj = {}
        obj.text = item.content
        num +=10
        obj.time = num
        obj.color = "#ffffff"
        arr.push(obj)
      })
      console.log(arr);
      this.setData({
        danmulist: arr
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