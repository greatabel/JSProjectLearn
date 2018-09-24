function convertToGrayscale(data) {
  let g = 0
  for (let i = 0; i < data.length; i += 4) {
    g = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11)
    data[i] = g
    data[i + 1] = g
    data[i + 2] = g
  }
  return data
}

Page({
  onReady() {
  },

  openAndDraw() {
    wx.chooseImage({
      success: (res) => {
        const ctx = wx.createCanvasContext('canvasIn', this);
        ctx.drawImage(res.tempFilePaths[0], 0, 0)
        ctx.draw()
      }
    })
  },

  export() {
    wx.canvasToTempFilePath({
      canvasId: 'canvasOut',
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.error(err)
          }
        })
      },
      fail: (err) => {
        console.error(err)
      }
    }, this)
  },

  process() {
    const cfg = {
      x: 0,
      y: 0,
      width: 300,
      height: 300,
    }
    wx.canvasGetImageData({
      canvasId: 'canvasIn',
      ...cfg,
      success: (res) => {
        const data = convertToGrayscale(res.data)
        wx.canvasPutImageData({
          canvasId: 'canvasOut',
          data,
          ...cfg,
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.error(err)
          }
        })
      },
      fail: (err) => {
        console.error(err)
      }
    })
  }
})
