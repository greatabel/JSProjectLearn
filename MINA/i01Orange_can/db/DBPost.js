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
class DBPost {
  constructor(postId){
    this.storageKeyName = 'postList';
    this.postId = postId;
  }

  //收藏
  collect() {
    return this.updatePostData('collect');
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

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)  
  }

};

export {DBPost};