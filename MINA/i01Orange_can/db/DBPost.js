// var DBPost = function() {
//   this.storageKeyName = "postList";
// }

// DBPost.prototype = {
//   getAllPostData: function(){
//     var res = wx.getStorageSync(this.storageKeyName);
//     if(!res){
//       res = require('../data/data.js').postList;
//       this.execSetStorageSync(res);
//     }
//     return res;
//   },

//   execSetStorageSync: function(data){
//     wx.setStorageSync(this.storageKeyName, data)  
//   },
// };

// module.exports = {
//   DBPost: DBPost
// };
var util = require('../utils/util.js')


class DBPost {
  constructor(postId){
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  //收藏
  collect() {
    return this.updatePostData('collect');
  }

  up() {
    return this.updatePostData('up');

  }

  updatePostData(category, newComment){
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();
    switch(category){
      case 'collect':
        if (!postData.collectionStatus) {
          //如果当前状态是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else {
          // 如果当前状态是收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      case 'up':
        if(!postData.upStatus){
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }

  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  getPostItemById(){
    var postData = this.getAllPostData()
    var len = postData.length;
    for(var i=0;i<len;i++){
      if(postData[i].postId == this.postId){
        return {
          index: i,
          data: postData[i]
        }
      }
    }
  }


  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1
    } else {
      return 0;
    }
  }

  //获取文章的评论数据
  getCommentData() {
    var itemData = this.getPostItemById().data;
    itemData.comments.sort(this.compareWithTime); //按时间降序
    var len = itemData.comments.length,
      comment;
    for (var i = 0; i < len; i++) {
      // 将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)  
  }

};

export {DBPost};