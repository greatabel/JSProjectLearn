var common = require('../../utils/common.js')

const app = getApp()
Page({
  formSubmit: function(e){
    app.globalData.globalDataTest++
    console.log(app.globalData.globalDataTest)
    console.log('form发生了submit事件，携带数据为:', e.detail.value)
  },
  formReset: function(){
    console.log('form发生了reset事件',app.globalData.globalDataTest)
    common.sayHello('MINA')
  }
})