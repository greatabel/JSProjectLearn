var pageData = {}
for (var i = 1; i < 5; i++) {
  (function (index) {
    pageData['slider' + index + 'change'] = function (e) {
      console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
    }
  })(i)
}
pageData['switch1Change'] = function (e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
pageData['switch2Change'] = function (e){
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  }
Page(pageData)