import api from '../../http/api'
const data = require('../../utils/data/data.js')
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
      api.search(search,10).then(res => {
        res.result.albums.map(item => {
          item.publishTime = data.tsFormatTime(item.publishTime, 'Y-M-D')
        })
        this.setData({
          arr:res.result.albums
        })
        // console.log(res.result.albums);
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
