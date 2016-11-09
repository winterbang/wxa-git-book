var app = getApp()
Page({
  data: {
    id: "",
    chapters: [],
    percent: 0
  },
  onLoad: function(options) {
    var that = this
    console.log(app.baseUrl + "book/"+options.id+"/contents")
    wx.request({
      url: app.baseUrl + "book/"+options.id+"/contents",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('res');
        console.log(res.data)
        that.setData({
          id: options.id,
          chapters: res.data.progress.chapters,
          percent: res.data.progress.percent
        })
      }
    })
  }
})
