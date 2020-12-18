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
    checked: false,
    userMessage: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange({ detail }) {
      // 需要手动对 checked 状态进行更新
      this.setData({ checked: detail });
    },
    //登录
    login() {
      wx.navigateTo({
        url: '../login/login',
      })
    },
    //退出
    logout() {
      wx.showModal({
        title: '确定退出',
        success: (res)=> {
          if (res.confirm) {
            api.logout().then(res => {
              // console.log(res);
            }).catch(err => {
              console.log(err);
            })
            wx.removeStorage({
              key: 'userMessage',
            })
            this.triggerEvent('show')
            this.setData({
              userMessage:''
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
  pageLifetimes: {
    show() {
      this.setData({
        userMessage: wx.getStorageSync('userMessage')
      })
    }
  }
})
