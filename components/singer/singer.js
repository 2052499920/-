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

  },
  pageLifetimes: {
    show() {
      let search = wx.getStorageSync('search')
      api.search(search, 100).then(res => {
        // console.log(res.result.artists);
        this.setData({
          arr:res.result.artists
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
