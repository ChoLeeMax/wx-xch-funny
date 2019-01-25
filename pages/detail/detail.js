Page({
  data:{
    text:"Page detail",
    url: '',
    height: 0,
    width: 0
  },
  onLoad:function(options){
    this.setData({
      url: options.url,
      height: options.h,
      width: options.w
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})