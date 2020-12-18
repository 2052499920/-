import fly from '/index'
export default {
  //首页发现
  home() {
    return fly.get('/homepage/block/page')
  },
  //首页-发现-圆形图标入口列表
  homepage() {
    return fly.get('/homepage/dragon/ball')
  },
  //轮播图
  bannes() {
    return fly.get('/banner?type=2')
  },
  //获取每日推荐歌单
  recommend(cookie) {
    return fly.get(`/recommend/resource?cookie=${cookie}`)
  },
  //推荐歌单
  personalized() {
    return fly.get(`/personalized`)
  },
  // 获取新歌
  newsong() {
    return fly.get(`/personalized/newsong`)
  },
  //音乐日历
  calendar(cookie, startTime, endTime) {
    return fly.get(`/calendar?cookie=${cookie}&startTime=${startTime}&endTime=${endTime}`)
  },
  //新歌速递
  topSong() {
    return fly.get(`/top/song?type=0`)
  },
  //全部新碟
  albumNew(area, limit) {
    return fly.get(`/album/new?area=${area}&limit=${limit}`)
  },
  //首页新碟上架数据
  newest() {
    return fly.get(`/album/newest`)
  },
  // 新碟
  album() {
    return fly.get(`/top/album?offset=0&limit=6`)
  },
  //所有榜单
  toplist() {
    return fly.get(`/toplist`)
  },
  //排行榜详情
  rankingDetails(id) {
    return fly.get(`/top/list?id=${id}`)
  },
  //默认搜索关键词
  default() {
    return fly.get(`/search/default`)
  },
  //热搜列表(简略)
  hot() {
    return fly.get(`/search/hot`)
  },
  //热搜列表(详细)
  detail() {
    return fly.get(`/search/hot/detail`)
  },
  //搜索
  search(keywords, type) {
    return fly.get(`/search?keywords=${keywords}&type=${type}&limit=20`)
  },
  //搜索建议
  suggest(keywords) {
    return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
  },
  //搜索多重匹配
  multimatch(keywords) {
    return fly.get(`/search/multimatch?keywords=${keywords}`)
  },
  // 获取歌曲详情
  songDetail(ids) {
    return fly.get(`/song/detail?ids=${ids}`)
  },
  // 获取歌词
  lyric(id) {
    return fly.get(`/lyric?id=${id}`)
  },
  // 获取音乐 url
  songUrl(id) {
    return fly.get(`/song/url?id=${id}`)
  },
  //获取每日推荐歌曲
  recommendSongs(cookie) {
    return fly.get(`/recommend/songs?cookie=${cookie}`)
  },
  //私人FM
  personalFM(cookie){
    return fly.get(`/personal_fm?cookie=${cookie}`)
  },
  //歌单分类-推荐
  playlist(){
    return fly.get(`/top/playlist`)
  },
  //获取歌单详情
  playlistDetail(id){
    return fly.get(`/playlist/detail?id=${id}`)
  },
  // 获取视频播放地址
  playVideo(id){
    return fly.get(`/video/url?id=${id}`)
  },
  // 视频详情
  videoDetail(id){
    return fly.get(`/video/detail?id=${id}`)
  },
  // 视频评论
  videoComment(id){
    return fly.get(`/comment/video?id=${id}`)
  },











  //手机登录
  loginCellphone(phone, password) {
    return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
  },
  //邮箱登录
  loginMail() {
    return fly.get('/login')
  },
  //刷新登录
  refresh() {
    return fly.get('/login/refresh')
  },
  //登录状态
  status(cookie) {
    return fly.get(`/login/status?cookie=${cookie}`)
  },
  //发送验证码
  captcha(phone) {
    return fly.get(`/captcha/sent?phone=${phone}`)
  },
  //验证验证码
  verify(phone, captcha) {
    return fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
  },
  //注册(修改密码)
  singCellphone(captcha, phone, password, nickname) {
    return fly.get(`/register/cellphone?captcha=${captcha}&phone=${phone}&password=${password}&nickname=${nickname}&`)
  },
  //检测手机号码是否已注册
  phoneCheck(phone) {
    return fly.get(`/cellphone/existence/check?phone=${phone}`)
  },
  //退出登录
  logout() {
    return fly.get(`/logout`)
  }
}