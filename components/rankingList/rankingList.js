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
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  pageLifetimes: {
    show() {
      api.toplist().then(res => {
        res.list.slice(0, 5).map(item => {
          api.rankingDetails(
            item.id
          ).then(res => {
            res.playlist.tracks = res.playlist.tracks.slice(0, 3)
            // console.log(res);
            this.data.arr.push(res)
            this.setData({
              arr: this.data.arr
            })
          }).catch(err => {
            console.log(err);
          })
        })
      }).catch(err => {
        console.log(err);
      })

    }
  }
})
