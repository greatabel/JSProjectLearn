import { DBPost } from '../../../db/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyboardInputValue: '',
    chooseFiles: [],
    sendMoreMsgFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();
    console.log(comments)
    this.setData({
      comments: comments
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onUnload: function () {

  },

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

  //预览图片
  previewImg: function (event) {
    //获取评论序号
    var commentIdx = event.currentTarget.dataset.commentIdx,
      //获取图片在图片数组中的序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },


  //切换语音和键盘输入
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  bindCommentInput: function(event){
    var value = event.detail.value;
    var pos = event.detail.cursor;
    if(pos!= -1){
      var left = event.detail.value.slice(0, pos)
      console.log(left)
      pos = left.replace(/qq/g, '*').length
    }
    this.data.keyboardInputValue = value;
    return {
      value: value.replace(/qq/g, '*'),
      cursor: pos
    }
  },

  submitComment: function (event) {
    var imgs = this.data.chooseFiles;
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: this.data.keyboardInputValue,
        img: imgs
      },
    };
    if (!newData.content.txt && imgs.length === 0) {
      console.log('submitComment0')
      return;
    }
    console.log('submitComment1')
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);

    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();

  },
  //评论成功
  showCommitSuccessToast: function () {
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration: 1000,
      icon: "success"
    })
  },
  bindCommentData: function () {
    var comments = this.dbPost.getCommentData();
    // 绑定评论数据
    this.setData({
      comments: comments
    });
  },

  //将所有相关的按钮状态，输入状态都回到初始化状态
  resetAllDefaultStatus: function () {
    //清空评论框
    this.setData({
      keyboardInputValue: '',
      chooseFiles: [],
      sendMoreMsgFlag: false
    });
  },
  //显示 选择照片、拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  //选择本地照片与拍照
  chooseImage: function (event) {
    // 已选择图片数组
    var imgArr = this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    console.log(leftCount)
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        // 可以分次选择图片，但总数不能超过3张
        console.log(res)
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });
      }
    })
  },


  
})