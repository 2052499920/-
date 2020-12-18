const Fly = require("../lib/fly/wx")
const fly = new Fly()
fly.config.baseURL='http://49.233.66.125:3000'

fly.interceptors.response.use((response)=>{
  return response.data
})
module.exports = fly