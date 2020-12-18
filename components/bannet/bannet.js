import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    playMusic(e) {
      api.lyric(e.currentTarget.dataset.item.encodeId).then(res => {
        console.log(res.lrc);
        if (res.lrc) {
          e.currentTarget.dataset.item.id = e.currentTarget.dataset.item.encodeId
          console.log(e.currentTarget.dataset.item);
          let arr = []
          arr.push(e.currentTarget.dataset.item)
          wx.setStorage({
            data: arr,
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
        }
      })
    }
  }
})
