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
    flag: 1,
    newsong: [],
    newest: [],
    album: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    newSong() {
      this.setData({
        flag: 1
      })
    },
    newDisc() {
      this.setData({
        flag: 2
      })
    },
    digitAlbum() {
      this.setData({
        flag: 3
      })
    },
    play(e) {   //新歌
      // console.log(e.currentTarget.dataset.index);
      wx.setStorage({
        data: this.data.newsong,
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
    newest(e) {  //新碟
      api.playlistDetail(e.currentTarget.dataset.item.id).then(res => {
        console.log(res);
      })
      // wx.setStorage({
      //   data: this.data.newest,
      //   key: 'musics',

      // })
      // wx.navigateTo({
      //   url: `../playMusic/playMusic`,
      // })
      // wx.setStorage({
      //   data: e.currentTarget.dataset.index,
      //   key: 'activeIndex',
      // })
    }
  },
  pageLifetimes: {
    show() {
      api.newsong().then(res => {   //新歌
        // console.log(res.result);
        this.setData({
          newsong: res.result.slice(0, 9)
        })
      }).catch(err => {
        console.log(err);
      })

      api.newest().then(res => {  //新碟
        this.setData({
          newest: res.albums
        })
        // console.log(res.albums);
      }).catch(err => {
        console.log(err);
      })

      api.album().then(res => {  //数字专辑
        this.setData({
          album: res.albums
        })
        // console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
