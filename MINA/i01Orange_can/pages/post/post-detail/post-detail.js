import { DBPost } from '../../../db/DBPost.js';

var app = getApp();
console.log('app=', app)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;

    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;

    this.setData({
      post: this.postData
    })
    this.addReadingTimes();
    this.setMusicMonitor();
    this.initMusicStatus();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function () {
  //   console.log('page is onUnload')
  //   wx.stopBackgroundAudio()
  //   this.setData({
  //     isPlayingMusic: false
  //   })
  //   console.log('onUnload app.globalData.g_isPlayingMusic ', app.globalData.g_isPlayingMusic)

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  onCollectionTap: function (event) {
    var newData = this.dbPost.collect();

    // 重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    // 应当有选择的更新部分数据

    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.collectionNum': newData.collectionNum
    })

    // 交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  onUpTap: function(event){
    var newData = this.dbPost.up()
    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    })
  },

  onCommentTap: function (event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + id
    })
  },

  //阅读量+1
  addReadingTimes: function () {
    this.dbPost.addReadingTimes();
  },
  onMusicTap: function(event) {
    
    if(this.data.isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;

    } else {
      console.log('playBackgroundAudio ' + this.postData.music.url)
      wx.playBackgroundAudio({
        dataUrl: this.postData.music.url,
        title: this.postData.music.title,
        coverImgUrl: this.postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;


    }
    console.log('onMusicTap app.globalData.g_isPlayingMusic ', app.globalData.g_isPlayingMusic)

  },
  setMusicMonitor: function(){
    var that = this;
    wx.onBackgroundAudioStop(function (){
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      console.log('setMusicMonitor app.globalData.g_isPlayingMusic ', app.globalData.g_isPlayingMusic)
    })
  },

  initMusicStatus() {
    console.log('initMusicStatus app.globalData.g_isPlayingMusic ', app.globalData.g_isPlayingMusic)
    this.setData({
      isPlayingMusic: app.globalData.g_isPlayingMusic
    })
  }
})