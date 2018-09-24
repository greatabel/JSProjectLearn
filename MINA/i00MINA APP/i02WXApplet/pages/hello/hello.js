var helloData = {
  name: '微信'
}

Page({
  data: helloData,
  changeName: function(e){
    this.setData({ name: 'MINA'})
  }
})