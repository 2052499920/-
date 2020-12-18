import api from "../../http/api"
const dayjs = require("./dayjs");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musics: [],
    songName: '',
    img: "",
    add: 'running',
    show: false,
    showa: true,
    lyric: '',
    backgroundAudioManager: '',
    stare: '00:00',
    end: '',
    max: 100,
    value: 0,
    arrs: [],
    active: 0,
    distance: 0,
    activeIndex: 0,
    arr: [],
    play: '',
    flag: 1,
    srt: '',
    playList: false,
    plays: []
  },
  play() {   //播放暂停样式
    if (this.data.add === "paused") {
      this.setData({
        add: "running",
        show: false
      })
    } else {
      this.setData({
        add: "paused",
        show: true
      })
    }
  },
  audioPlay() {  //播放功能
    this.data.backgroundAudioManager.play()
  },
  audippause() {  //暂停功能
    this.data.backgroundAudioManager.pause();
  },
  showa() {
    this.setData({
      showa: false
    })
  },
  showb() {
    this.setData({
      showa: true
    })
  },
  onDrag(e) {
    // console.log(e.detail);
    this.data.backgroundAudioManager.seek(e.detail)
  },
  detailsSong() {   //播放信息
    api.lyric(this.data.musics[this.data.activeIndex].id).then(res => {   //获取歌词
      // console.log(res);
      if (res.lrc) {
        // console.log(res.lrc.lyric);
        let str = res.lrc.lyric;
        str = str.split(/\n/g);
        // console.log(str);
        str.map(item => {
          // arr.push(item.substr(1).split(']'))
          let arr = item.substr(1).split(']')
          // console.log(arr);
          let obj = {}
          if (arr[1]) {
            obj.date = arr[0].slice(0, 5),
              obj.text = arr[1]
          }
          this.data.arrs.push(obj)
        })
        // console.log(this.data.arrs);
        this.setData({
          lyric: this.data.arrs,
        });
      } else {
        this.setData({
          str: '暂无歌词'
        })
      }
    }).catch(err => {
      console.log(err);
    })

    api.songUrl(this.data.musics[this.data.activeIndex].id).then(res => {  //歌曲地址
      // console.log(res);
      api.songDetail(this.data.musics[this.data.activeIndex].id).then(resa => {  //歌曲详情
        // console.log(resa);
        wx.setStorage({
          data: resa.songs[0],
          key: 'DetailsSong',
        })
        let date = dayjs(resa.songs[0].dt).format('mm:ss');
        let max = resa.songs[0].dt / 1000
        this.setData({
          img: resa.songs[0].al.picUrl,
          end: date,
          max: max
        })
        wx.setNavigationBarTitle({
          title: resa.songs[0].name
        })
        if (res.data[0].url) {
          if (!this.data.play) {
            // console.log(this.data.play,11);
            this.data.backgroundAudioManager.src = res.data[0].url
            this.data.backgroundAudioManager.title = resa.songs[0].name
            this.setData({
              play: ""
            })
          } else {
            if (this.data.play === "false") {
              this.setData({
                show: true,
                add: "paused",
              })
            }
          }
        } else {
          if (this.data.activeIndex == this.data.musics.length - 1) {
            this.setData({
              activeIndex: 0
            })
          } else {
            this.data.activeIndex += 1
            this.setData({
              activeIndex: this.data.activeIndex
            })
            wx.setStorage({
              data: this.data.activeIndex,
              key: 'activeIndex',
            })
            this.detailsSong()
          }
        }
      }).catch(err => {
        console.log(err);
      })

    }).catch(err => {
      console.log(err);
    })

  },
  up() {  //上一首
    if (this.data.activeIndex == 0) {
      this.setData({
        activeIndex: 0,
        arrs: [],
        show: false
      })
      wx.setStorage({
        data: this.data.activeIndex,
        key: 'activeIndex',
      })
      this.detailsSong()
    } else {
      this.playOrder()
    }
  },
  next() {  //下一首
    if (this.data.activeIndex == this.data.musics.length - 1) {
      this.setData({
        activeIndex: 0,
        arrs: [],
        show: false
      })
      wx.setStorage({
        data: this.data.activeIndex,
        key: 'activeIndex',
      })
      this.detailsSong()
    } else {
      this.playOrder()
    }
  },
  circulation() {  //顺序播放
    this.setData({
      flag: 2
    })
    wx.setStorage({
      data: 2,
      key: 'flag',
    })
  },
  circulation1() {  //单曲循环
    this.setData({
      flag: 3
    })
    wx.setStorage({
      data: 3,
      key: 'flag',
    })
  },
  random() {  //随机播放
    this.setData({
      flag: 1
    })
    wx.setStorage({
      data: 1,
      key: 'flag',
    })
  },
  playList() {  //歌单
    this.setData({
      playList: true
    })
  },
  onClose() {  //点击遮罩层关闭
    this.setData({ playList: false });
  },
  playsIndex(e) { //弹出层点击高亮，换歌
    console.log(e.currentTarget.dataset.index);
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    wx.setStorage({
      data: e.currentTarget.dataset.index,
      key: 'activeIndex',
    })
    this.detailsSong()
  },
  playOrder() {    //播放顺序
    if (this.data.flag === 2) {
      this.setData({
        activeIndex: this.data.activeIndex,
        arrs: [],
        show: false
      })
      wx.setStorage({
        data: this.data.activeIndex,
        key: 'activeIndex',
      })
      this.detailsSong()
    } else if (this.data.flag === 1) {
      this.data.activeIndex += 1
      this.setData({
        activeIndex: this.data.activeIndex,
        arrs: [],
        show: false
      })
      wx.setStorage({
        data: this.data.activeIndex,
        key: 'activeIndex',
      })
      this.detailsSong()
    } else if (this.data.flag === 3) {
      let num = Math.floor(Math.random() * this.data.musics.length)
      this.setData({
        activeIndex: num,
        arrs: [],
        show: false
      })
      wx.setStorage({
        data: this.data.activeIndex,
        key: 'activeIndex',
      })
      this.detailsSong()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.play);
    let musics = wx.getStorageSync('musics')
    let activeIndex = wx.getStorageSync('activeIndex')
    let currentTime = wx.getStorageSync('currentTime')
    this.setData({
      musics: musics,
      play: options.play,
      activeIndex: activeIndex,
      currentTime: currentTime
    })

    this.data.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.data.backgroundAudioManager.onTimeUpdate(() => {   //获取播放时间
      let currentTime = dayjs(this.data.backgroundAudioManager.currentTime * 1000).format('mm:ss');
      wx.setStorage({
        data: currentTime,
        key: 'currentTime',
      })
      //歌词高亮
      // console.log(this.data.arrs);
      for (let i = 0; i < this.data.arrs.length; i++) {
        if (this.data.arrs[i].date === currentTime) {
          // console.log(i);
          this.setData({
            active: i,
            distance: i - 5
          })
          break
        }
      }
      //高亮结束
      // console.log(currentTime);
      let value = this.data.backgroundAudioManager.currentTime
      // console.log(value);
      this.setData({
        stare: currentTime,
        value: value
      })
    })
    this.data.backgroundAudioManager.onEnded(() => {  //自然播放时间结束
      if (musics.length === 1) {
        this.setData({
          activeIndex: 0,
          arrs: []
        })
        wx.setStorage({
          data: this.data.activeIndex,
          key: 'activeIndex',
        })
        this.detailsSong()
      } else {
        if (this.data.activeIndex === musics.length) {
          this.setData({
            activeIndex: 0,
            arrs: []
          })
          wx.setStorage({
            data: this.data.activeIndex,
            key: 'activeIndex',
          })
          this.detailsSong()
        } else {
          this.playOrder()
        }
      }
    })
    musics.map(item => {
      api.songDetail(item.id).then(res => {
        // console.log(res.songs[0]);
        this.data.plays.push(res.songs[0])
        this.setData({
          plays: this.data.plays
        })
      })
    })
    wx.setStorage({
      data: 1,
      key: 'flag',
    })
    let flag1 = wx.getStorageSync('flag')

    this.setData({
      flag: flag1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.detailsSong()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})