// var dataObj = require("../../data/data.js")
// var DBPost = require('../../db/DBPost.js').DBPost;
import {DBPost} from '../../db/DBPost.js';

// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},
//   data: {
//     object: {
//       date: "Oct 05 2018"
//     },
    
//     title: "小时候的冰棍儿和雪糕",
//     postImg: "/images/post/post-4.jpg",
//     avatar: "/images/avatar/avatar-5.png",
//     content: "冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍\
//  冰棍冰棍冰棍冰棍...",
//     readingNum: 92,
//     collectionNum: {
//       array: [104]
//     },
//     commentNum: 7

//   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//     var iceCreamData = {
//       object: {
//         date: 'Oct 06 2018'
//       },
//       title: "新的小时候冰棍儿",
//       postImg: "/images/post/post-4.jpg",
//       avatar: "/images/avatar/avatar-5.png",
//       content: "冰棍#冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍冰棍\
//  冰棍冰棍冰棍冰棍#...",
//       readingNum: 92,
//       collectionNum: {
//         array: [103]
//       },
//       commentNum: 7
//     }
//     var trainData = {
//       object: {
//         date: 'Oct 07 2018'
//       },
//       title: "新的小时候火车",
//       postImg: "/images/post/post-1.jpg",
//       avatar: "/images/avatar/avatar-3.png",
//       content: "火车火车火车火车火车火车\
//  火车火车火车火车火车#...",
//       readingNum: 93,
//       collectionNum: {
//         array: [104]
//       },
//       commentNum: 9
//     }
//     var postList = [iceCreamData, trainData]
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
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

  }
})