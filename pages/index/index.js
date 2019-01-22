//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    location:"",
    tmp:"",
    txt: "",
    qlty: "优良",
    wind_dir: "",
    wind_sc: "",
    hum: "",
    lifeStyle: ""
  }, 
  refreshData:function(){
    this.getLocation();
  },
  onLoad: function () {
    this.getLocation();
  },
  getLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function (res) {
        console.log(res);
        var lat= res.latitude;
        var lng = res.longitude;
        that.getLocCity(lat, lng);
      }, 
      fail: function (res) {
        console.log('fail:'+JSON.stringify(res));
      }
    })
  },
  getLocCity: function (lat, lng){
    var that = this;
        var _url ="https://free-api.heweather.net/s6/weather";
        var _data={
          lang:"cn",
          location: lat+','+lng,
          key:'7d4883c5e452421488debab9be7dd81f'
        };
    wx.showLoading({
      title: '加载中',
    })
         wx.request({
           url: _url,
           data: _data,
           method: 'GET',
           dataType: 'json',
           success: function(res) {
             console.log(res);
             wx.hideLoading();
             var item = res.data.HeWeather6[0];
             if (res.statusCode == '200' && item){
               var tepArr = item.lifestyle.filter(function (obj) {
                 return obj.type ==="sport";
               });
               that.setData({
                 location: item.basic.parent_city,
                 tmp: item.now.tmp,
                 txt: item.now.cond_txt,
                 wind_dir: item.now.wind_dir,
                 wind_sc: item.now.wind_sc,
                 hum: item.now.vis,
                 level: tepArr[0]["brf"]
               });
             }else{

             }
           }
         })
  },
})
