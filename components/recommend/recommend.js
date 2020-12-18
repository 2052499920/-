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
arr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    more(){
      wx.navigateTo({
        url: '../playlist/playlist',
      })
    },
    playlista(e) {
      // console.log(e.currentTarget.dataset.item);
      api.playlistDetail(e.currentTarget.dataset.item.id).then(res => {
        // console.log(res);
        wx.setStorage({
          data: res.playlist.trackIds.slice(0,20),
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
      })
    },
 },
  pageLifetimes: {
    show() {
      api.personalized().then(res => {  //推荐歌单 
        res.result.map(item=>{
          if(item.playCount>10000){
            item.playCount = Math.round(item.playCount/10000)+" 万"
          }
        })
        this.setData({
          arr:res.result.slice(0,6)
        })
        // console.log(res.result);
      }).catch(ree => {
        console.log(ree);
      })
    }
  }
})
