Page({
  data: {
    item: {
      index: 10,
      msg: '这是模版',
      time: '2018-09-10'
    }
  },
  tapJumpToPage: function(e){
    console.log(e.currentTarget.id)
    var url = ''
    switch (e.currentTarget.id){
      case 'Scroll':
        url =  '../scroll/scroll-view'
        break
      case 'Swipper':
        url = '../swiper/swiper-item'
        break
      case 'Movable':
        url = '../movable/movable-view'
        break
      case 'Cover':
        url = '../cover/cover-view'
        break
      case 'basicContent':
        url = '../basicContent/basic-content'
        break
      case 'formComponent':
        url = '../formComponent/form-component'
        break
      case 'interact':
        url = '../interact/interact'
        break
      case 'navigator':
        url = '../navigator/navigator'
        break
      case 'media':
        url = '../media/media'
        break
      case 'map':
        url = '../map/map'
        break
      case 'canvas':
        url = '../canvas/canvas'
        break
      default:
        url = ''
    }
    wx.navigateTo({
      url: url
    })

  },

  
  
})