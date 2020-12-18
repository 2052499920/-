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
    arr: [],
    flag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    unfold() {
      this.setData({
        flag: true
      })
    },
    packUp(){
      this.setData({
        flag: false
      })
    }
  },
  pageLifetimes: {
    show() {
      let search = wx.getStorageSync('search')
      api.search(search, 1006).then(res => {
        // console.log(res.result.songs);
        this.setData({
          arr: res.result.songs
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
