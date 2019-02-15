var bmap = require('../../utils/bmap-wx/bmap-wx.min.js');
Page({
  data: {
    weatherData: '',
    weatherData_future: []

  },
  onLoad: function() {
    this.getWeatherData()
  },
  onShow: function() {
    this.getUserLocaltion()
  },
  // 获取天气数据
  getWeatherData() {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: 'kZPZnnDA05yD9ybhOigoOnLCVp6GAYWw'
    })
    var fail = function(data) {
      console.log('fail!!!!')
    }
    var success = function(data) {
      // console.log('success!!!')
      // console.log(data.originalData.results[0].weather_data)
      // console.log(data.currentWeather)
      var weatherData_future = data.originalData.results[0].weather_data
      var weatherData = data.currentWeather[0]
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n'
      that.setData({
        weatherData: weatherData,
        weatherData_future: weatherData_future
      });
    }
    BMap.weather({
      success: success,
      fail: fail
    });
    //详细定位
    BMap.regeocoding({
      success: function(e) {
        // console.log(e.originalData)
      }
    })
  },
  // 获取用户授权
  getUserLocaltion() {
    let that = this
    wx.getSetting({
      success: (res) => {
        // console.log(res.authSetting)
        // console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求当前位置来获取天气详情',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: (dataAu)=>{
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'none',
                        duration: 1000
                      })
                      that.getWeatherData();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          that.getWeatherData()
        } else {
          that.getWeatherData()
        }
      }
    })
  },
})