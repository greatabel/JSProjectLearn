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
      default:
        url = ''
    }
    wx.navigateTo({
      url: url
    })

  },



})