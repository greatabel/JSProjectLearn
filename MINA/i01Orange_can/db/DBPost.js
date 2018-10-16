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
  constructor(url){
    this.storageKeyName = 'postList';
  }

  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data)  
  }

};

export {DBPost};