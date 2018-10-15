//app.js
var dataObj = require("data/data.js")
App({
  onLaunch: function () {
    wx.setStorage({
      key: 'postList',
      data: dataObj.postList,
      success: function(res){

      },
      fail: function(){

      },
      complete: function(){
        
      }
    })
  },
  globalData: {

  }
})