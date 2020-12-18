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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    recommend() {
      if (wx.getStorageSync('userMessage')) {
        wx.navigateTo({
          url: '../dailySpecial/dailySpecial',
        })
      } else {
        wx.showModal({
          title: '你还未登录，是否跳转到登录页',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../signIn/signIn',
              })
            } else {
              wx.showToast({
                title: '你取消了操作',
                icon: 'none',
              })
            }
          }
        })
      }
    },
    personalFM() {
      if (wx.getStorageSync('userMessage')) {

      } else {
        wx.showModal({
          title: '你还未登录，是否跳转到登录页',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../signIn/signIn',
              })
            } else {
              wx.showToast({
                title: '你取消了操作',
                icon: 'none',
              })
            }
          }
        })
      }
    },
    playlist(){
      wx.navigateTo({
        url: '../playlist/playlist',
      })
    }
  }
})
