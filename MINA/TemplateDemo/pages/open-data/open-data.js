wx.login({
  success: res => {
    // ------ 获取凭证 ------
    var code = res.code
    console.log('wx.login=', code)
  }
})

Page({
  data: {
    open_gid: 0,
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  // 其他的页面函数、生命周期函数等
  onShareAppMessage() {
    return {
      title: '页面分享标题',
      path: '/pages/open-data/open-data',
      success(res) {
        console.log('res=', res)
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log('转发成功')
        }
        var shareTicket = res.shareTickets[0] // 获取 shareTicket
        // console.log(shareTicket) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
        // var that = this;

        wx.getShareInfo({
          shareTicket: shareTicket,
          // complete(res) {
          //   console.log('getShareInfo=', res) // 输出加密后的 openGId 信息

            // that.setData({
            //   open_gid: res
            // })
          // }
          success: function(res){
            console.log('getShareInfo=', res)
          },
          fail: function(res){
            console.log('getShareInfo fail')
          }
        })
      }
    }
  }
})