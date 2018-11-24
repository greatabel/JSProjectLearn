//app.js

App({
  onLaunch: function () {
    // wx.setStorage({
    //   key: 'postList',
    //   data: dataObj.postList,
    //   success: function(res){

    //   },
    //   fail: function(){

    //   },
    //   complete: function(){

    //   }
    // })
    var storageData = wx.getStorageSync("postList");
    if(!storageData){
      var dataObj = require("data/data.js")
      wx.clearStorageSync();
      wx.setStorageSync("postList", dataObj.postList); 
    }

  },
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null
  }
})