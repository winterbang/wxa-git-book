var html2text = require('./html2Text.js')
var WxParse = require('../../../lib/wxParse/wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    sections: [],
    wxParseData: ""
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.baseUrl + "book/"+options.id+"/contents/"+options.path.replace(/.md/, ".json"),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(sections)
        let sections = res.data.sections.map(function(section, index) {
          let content = html2text.convertHtmlToText(section.content)
          section.content = html2text.decodeHtmlEntity(section.content)
          return section
        })
        res.data.sections[0].content
        that.setData({
          sections: sections,
          wxParseData:WxParse('html',res.data.sections[0].content)
        })
      }
    })
  }
})
