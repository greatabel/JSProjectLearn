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
    this.setAnimation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },
  setAnimation: function(){
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp = animationUp
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

    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);

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
      app.globalData.g_currentMusicPostId = this.postData.postId;


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

    })

    wx.onBackgroundAudioPlay(function (event) {
      // 只处理当前页面的音乐播放。
      if (app.globalData.g_currentMusicPostId === that.postData.postId) {
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true;
    });

    wx.onBackgroundAudioPause(function () {
      // 只处理当前页面的音乐暂停。
      if (app.globalData.g_currentMusicPostId == that.postData.postId) {
        that.setData({
          isPlayingMusic: false
        })
      }
      app.globalData.g_isPlayingMusic = false;
    });
    
  },

  initMusicStatus() {
    // console.log('initMusicStatus app.globalData.g_isPlayingMusic ', app.globalData.g_isPlayingMusic)
    var currentPostId = this.postData.postId;
    if(app.globalData.g_isPlayingMusic 
    && app.globalData.g_currentMusicPostId === currentPostId){
      this.setData({
        isPlayingMusic: true
      })
    } else {
      this.setData({
        isPlayingMusic:false
      })
    }

  },

  onShareAppMessage: function () {
    return {
      title: this.postData.title,
      desc: this.postData.content,
      path: "/pages/post/post-detail/post-detail?id=" + this.postId
    }
  }

})