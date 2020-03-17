var util = require('../../utils/util.js')

var app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },
  onLoad: function(event){
    var inThreatersUrl = app.globalData.doubanBase +
    "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3"; 

    this.getMovieListData(inThreatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");  
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // 因为小程序后台只能把服务器域名设置为douban才能访问
        // 我只能hardcode测试
        var hardcodeData = {
          "count": 20,
          "start": 0,
          "total": 38,
          "subjects": [{
            'id': 1325007, 'title': '蓝色星球 The Blue Planet', 'rating': { 'average': 40, 'stars': 44 },
            'images': { 'large': 'https://img3.doubanio.com/view/photo/l/public/p2574122772.webp' },
            'summary': '蓝色星球」是历年来首套全面探索海洋世界的自然历史专辑'
          },
          {
            'id': 3041294, 'title': '生化危机4：战神再生', 'rating': { 'average': 45, 'stars': 45 },
            'images': { 'large': 'https://img9.doubanio.com/view/photo/l/public/p564897015.webp' },
            'summary': '爱丽丝（米拉·乔沃维奇 Milla Jovovich 饰）重回在东京，向安布雷拉公司复仇'
            },
            {
              'id': 25814705, 'title': '小森林 夏秋篇', 'rating': { 'average': 45, 'stars': 49 },
              'images': { 'large': 'https://img3.doubanio.com/view/photo/m/public/p2564498893.webp' },
              'summary': '平凡女孩市子（桥本爱 饰）自幼生长在位于日本东北地区的村庄小森'
            }],
          "title": "正在上映的电影-武汉"
        }
        that.processDoubanData(hardcodeData, settedKey, categoryTitle)
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey,
    categoryTitle) {
      var movies = [];
    console.log(moviesDouban)
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ''
    }
    )
  },
  onBindConfirm: function (event) {
    var keyWord = event.detail.value;
    var searchUrl = app.globalData.doubanBase +
      "/v2/movie/search?q=" + keyWord;
    console.log('onBindConfirm');
    this.getMovieListData(searchUrl, "searchResult", "");

  }

})