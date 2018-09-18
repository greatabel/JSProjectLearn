Page({
  data: {
    item: {
      index: 10,
      msg: '这是模版',
      time: '2018-09-10'
    }
  },
  tapJumpToPage: function (e) {
    console.log(e.currentTarget.id)
    var url = ''
    switch (e.currentTarget.id) {

      case 'audio':
        url = 'audio/audio'
        break
      case 'image':
        url = 'image/image'
        break
      case 'video':
        url = 'video/video'
        break
      case 'camera':
        url = 'camera/camera'
        break
      case 'live-player':
        url = 'live-player/live-player'
        break
      default:
        url = ''
    }
    wx.navigateTo({
      url: url
    })

  },



})