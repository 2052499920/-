import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    valuea: '',
    showKeyword: '',
    arr: [],
    show: true,
    search: [],
    history: []
  },
  cancel() {  //取消按钮，跳回首页
    wx.navigateTo({
      url: '../home/home',
    })
  },
  more() {  //展开更多热搜
    api.detail().then(res => {
      // console.log(res.data);
      this.setData({
        arr: this.data.arr.concat(res.data.slice(10)),
        show: false
      })
    }).catch(err => {
      console.log(err);
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
    }

  },
  clear() {  //清空按钮
    this.setData({
      search: []
    })
  },
  search() {  //ent事件
    if (this.data.value) {
      wx.navigateTo({
        url: `../search-listings/search-listings`,
      })
      wx.setStorage({
        data: this.data.value,
        key: 'search',
      })
      if (wx.getStorageSync('history').length > 0) {
        let arrs = wx.getStorageSync('history')
        arrs.unshift(this.data.value)
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
  clearAll() {  //清除历史记录
    wx.showModal({
      title: '是否清空历史记录',
      success: (res)=> {
        if (res.confirm) {
          this.setData({
            history: []
          })
          wx.setStorage({
            data: this.data.history,
            key: 'history',
          })
        } else {
          wx.showToast({
            title: '你取消了删除',
            icon: 'none',
          })
        }
      }
    })
  },
  searchHot(e) {    // 热搜榜事件
    // console.log(e.currentTarget.dataset.item.searchWord);
    this.setData({
      value: e.currentTarget.dataset.item.searchWord
    })
    this.search()
  },
  searchHistory(e) { //历史事件
    // console.log(e);
    this.setData({
      value: e.currentTarget.dataset.item
    })
    this.search()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.default().then(res => {  //默认搜索关键字
      // console.log(res);
      this.setData({
        valuea: res.data.realkeyword,
        showKeyword: res.data.showKeyword
      })
    }).catch(err => {
      console.log(err);
    })

    api.detail().then(res => {   //搜索榜
      // console.log(res);
      this.setData({
        arr: res.data.slice(0, 10)
      })
    }).catch(err => {
      console.log(err);
    })
    if (wx.getStorageSync('history').length > 0) {
      this.setData({
        history: wx.getStorageSync('history')
      })
    }
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