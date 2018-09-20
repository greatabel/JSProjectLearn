Page({
  data: {
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3'],
    hidden: false,
    nocancel: false
  },
  actionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  //显示是否点击成功
  itemTap: function () {
    console.log('tap ' + e.currentTarget.dataset.name);
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })

    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }, 
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel
    });
    console.log("clicked confirm");
  }
})
