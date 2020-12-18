import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    arr: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    play(e) {
      wx.setStorage({
        data: this.data.arr,
        key: 'musics',
      })
      wx.navigateTo({
        url: `../playMusic/playMusic`,
      })
      wx.setStorage({
        data: e.currentTarget.dataset.index,
        key: 'activeIndex',
      })
    },
    playAll() {
      wx.setStorage({
        data: this.data.arr,
        key: 'musics',
      })
      wx.navigateTo({
        url: '../playMusic/playMusic',
      })
      let activeIndex = 0
      wx.setStorage({
        data: activeIndex,
        key: 'activeIndex',
      })
    }
  },
  pageLifetimes: {
    show() {
      let search = wx.getStorageSync('search')
      // console.log(search);
      api.search(search, 1).then(res => {
        // console.log(res.result.songs);
        this.setData({
          arr: res.result.songs
        })
      })
    }
  }
})
