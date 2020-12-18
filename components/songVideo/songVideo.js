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
    playVideo: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    playVideo(e) {
      // console.log(e.currentTarget.dataset.item.vid);
      api.playVideo(e.currentTarget.dataset.item.vid).then(res => {
        if (res.urls.length > 0) {
          wx.navigateTo({
            url: `../playVideo/playVideo?vid=${e.currentTarget.dataset.item.vid}`,
          })
        }
      })
    },
    // play(e) {
    //   console.log('暂停');
    //   // console.log(e.currentTarget.dataset.index);
    //   this.data.playVideo.map((item,index)=>{
    //     if(e.currentTarget.dataset.index===index){
    //       let videoplay = wx.createVideoContext('myvideo'+index, this)
    //       videoplay.play();
    //     }else{
    //       let videoplay = wx.createVideoContext('myvideo'+index, this)
    //       videoplay.pause()
    //     }
    //   })
    // }
  },
  pageLifetimes: {
    show() {
      let search = wx.getStorageSync('search')
      api.search(search, 1014).then(res => {
        if (res.result.videos) {
          res.result.videos.map(item => {
              if (item.playTime > 10000) {
                if ((item.playTime / 10000 - parseInt(item.playTime / 10000)) * 10000 > 1000) {
                  item.playTime = parseInt(item.playTime / 10000) + '.' + parseInt((item.playTime / 10000 - parseInt(item.playTime / 10000)) * 10) + '万'
                } else {
                  item.playTime = parseInt(item.playTime / 10000) + '万'
                }
              }
            // api.playVideo(item.vid).then(resa => {  //视频地址
            //   // console.log(resa);
            //   if (resa.urls.length > 0) {
            //    this.data.playVideo.push(resa.urls[0].url)
            //     this.setData({
            //       playVideo:  this.data.playVideo
            //     })
            //   }
            // })
          })
          this.setData({
            arr:res.result.videos
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
})
