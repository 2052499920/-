const BackgroundAudioManager = wx.getBackgroundAudioManager()
const dayjs = require("./dayjs");
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
    DetailsSong: '',
    show: false,
    play: false,
    flag: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play() {
      this.setData({
        show: false
      })
      BackgroundAudioManager.play()
    },
    pause() {
      this.setData({
        show: true
      })
      BackgroundAudioManager.pause();
    },
    particulars() {
      if (this.data.show) {
        wx.navigateTo({
          url: `../playMusic/playMusic?play=${this.data.play}`,
        })
      } else {
        wx.navigateTo({
          url: `../playMusic/playMusic`,
        })
      }
    },
  },
  pageLifetimes: {
    show() {
      BackgroundAudioManager.onPause(() => {
        this.setData({
          show: true
        })
        // console.log('暂停');
      })
      BackgroundAudioManager.onPlay(() => {
        this.setData({
          show: false
        })
      })
      // console.log(111);
      BackgroundAudioManager.onCanplay(() => {
        // console.log(222);
        this.setData({
          flag: true
        })
      })
      let DetailsSong = wx.getStorageSync('DetailsSong')
      // console.log(DetailsSong);
      this.setData({
        DetailsSong: DetailsSong
      })
    }
  }
})
