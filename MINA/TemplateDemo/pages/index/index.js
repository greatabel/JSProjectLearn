Page({
  data: {
    item: {
      index: 10,
      msg: '这是模版',
      time: '2018-09-10'
    }
  },
  tapScroll: function(){
    wx.navigateTo({
      url: '../scroll/scroll-view'
    })
  },
  tapSwipper: function () {
    wx.navigateTo({
      url: '../swiper/swiper-item'
    })
  }
  
  
})