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