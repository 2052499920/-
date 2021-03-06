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
      api.search(search, 1009).then(res => {
        // console.log(res.result.djRadios);
        res.result.djRadios.map(item => {
          if (item.playCount > 10000) {
            if ((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10000 > 1000) {
              item.playCount = parseInt(item.playCount / 10000) + '.' + parseInt((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10) + '万'
            } else {
              item.playCount = parseInt(item.playCount / 10000) + '万'
            }
          }
        })
        this.setData({
          arr: res.result.djRadios
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
