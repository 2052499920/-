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
    result: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playvideo(e) {
      // console.log(e.currentTarget.dataset.item);
      api.playVideo(e.currentTarget.dataset.item.vid).then(res => {
        if(res.urls.length>0){
          wx.navigateTo({
            url: `../playVideo/playVideo?vid=${e.currentTarget.dataset.item.vid}`,
          })
        }
      })
    }
  },
  pageLifetimes: {
    show() {
      let search = wx.getStorageSync('search')
      api.search(search, 1018).then(res => {
        // console.log(res.result);
        //处理视频
        if (res.result.video) {
          res.result.video.videos.map(item => {
            if (item.durationms > 60000) {
              item.durationms = parseInt(item.durationms / 60000) + ':' + parseInt(((item.durationms / 60000) - parseInt(item.durationms / 60000)) * 60)
            } else {
              item.durationms = '00:' + parseInt(item.durationms / 10000)
            }

            if (item.playTime > 10000) {
              if ((item.playTime / 10000 - parseInt(item.playTime / 10000)) * 10000 > 1000) {
                item.playTime = parseInt(item.playTime / 10000) + '.' + parseInt((item.playTime / 10000 - parseInt(item.playTime / 10000)) * 10) + '万'
              } else {
                item.playTime = parseInt(item.playTime / 10000) + '万'
              }
            }
          })
        }
        //处理歌单
        if (res.result.playList) {
          res.result.playList.playLists.map(item => {
            if (item.playCount > 10000) {
              if ((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10000 > 1000) {
                item.playCount = parseInt(item.playCount / 10000) + '.' + parseInt((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10) + '万'
              } else {
                item.playCount = parseInt(item.playCount / 10000) + '万'
              }
            }
          })
        }
        //专辑时间
        if (res.result.album) {
          res.result.album.albums.map(item => {
            item.publishTime = data.tsFormatTime(item.publishTime, 'Y-M-D')
          })
        }
        ////播单
        if (res.result.djRadio) {
          res.result.djRadio.djRadios.map(item => {
            if (item.playCount > 10000) {
              if ((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10000 > 1000) {
                item.playCount = parseInt(item.playCount / 10000) + '.' + parseInt((item.playCount / 10000 - parseInt(item.playCount / 10000)) * 10) + '万'
              } else {
                item.playCount = parseInt(item.playCount / 10000) + '万'
              }
            }
          })
        }

        this.setData({
          result: res.result
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
