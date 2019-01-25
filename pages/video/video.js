Page({
  data: {
    // 正在播放的视频索引
    playIndex: null,
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('newlist');
  },
  /**
   * 视频格式出错
   */
  error: function (e) {
    console.log(e.detail);
  },
  timeUpdate:function(e){
    if (parseInt(e.detail.currentTime) == parseInt(e.detail.duration - 4)){
      var curIndex = e.currentTarget.dataset.index;
      wx.createVideoContext("video" + this.data.playIndex).pause();
    }
    
  },
  // 点击播放触发事件，这里关闭其他播放视频
  toPlay: function (e) {
    // 被点击视频index
    var curIndex = e.currentTarget.dataset.index;
    // 表示当前无播放视频
    if (!this.data.playIndex) {
      this.setData({
        playIndex: curIndex
      });
    } else {
      // 获取正在播放的视频
      var obj = wx.createVideoContext("video" + this.data.playIndex);
      //  被点击视频与播放视频id不一样,关闭当前播放视频
      if (curIndex != this.data.playIndex) {
        obj.pause();
      }
      this.setData({
        playIndex: curIndex
      })
      var videoContextCurrent = wx.createVideoContext('video' + curIndex)
      videoContextCurrent.play();
    }
  },
  /**
   * 加载数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        type: '41',
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          // 拼接数组
          list: that.data.list.concat(res.data.list)
        })
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh();
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.requestData('newlist');
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})