//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // const downloadTask = wx.downloadFile({
    //   url: 'https://lumistatic.blob.core.chinacloudapi.cn/android/meomo-0.5.0.apk', //仅为示例，并非真实的资源
    //   success(res) {
    //     wx.playVoice({
    //       filePath: res.tempFilePath
    //     })
    //   }
    // })

    // downloadTask.onProgressUpdate((res) => {
    //   console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    // })

    // downloadTask.abort() // 取消下载任务



  },

  tapJumpToPage: function (e) {
    console.log(e.currentTarget.id)
    var url = ''
    switch (e.currentTarget.id) {
      case 'chooseImage':
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
          }
        })
        break
      case 'previewImage':
        wx.previewImage({
          urls:           ['https://img1.gtimg.com/ninja/2/2018/09/ninja153749892389423.jpg',
          'https://img1.gtimg.com/ninja/2/2018/09/ninja153740742238761.jpg'],
        })
        break
      case 'startRecord':
        wx.startRecord({
          success(res) {
            const tempFilePath = res.tempFilePath
            console.log('tempFilePath=', tempFilePath)
          }
        })
        setTimeout(function () {
          wx.stopRecord() // 结束录音
        }, 10000)
        break
      case 'playVoice':
        wx.startRecord({
          success(res) {
            const tempFilePath = res.tempFilePath
            console.log('playVoice tempFilePath=', tempFilePath)
            wx.playVoice({
              filePath: tempFilePath,
              complete() { }
            })
          }
        })
        break
      case 'playBackgroundAudio':
        wx.playBackgroundAudio({
          dataUrl: 'http://screencasts.b0.upaiyun.com/podcasts/teahour_episode_93.mp3'
        })
        break
      case 'getLocation':
        wx.getLocation({
          type: 'wgs84',
          success: function(res) {
            var lat = res.latitude
            var lon = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy
            console.log(lat, lon, speed, accuracy)
          },
        })
        break
      default:
        url = ''
    }


  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
