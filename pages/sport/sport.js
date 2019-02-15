var point = []
var lat, lon
var total_time = 0
var newDistance = 0.0
var hr, min, sec
hr = min = sec = 0
var ms = 0
var showDistance = 0.00
// 计算距离  第一种方法
function getDistance(lat1, lng1, lat2, lng2) {
  var dis = 0;
  var radLat1 = toRadians(lat1);
  var radLat2 = toRadians(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRadians(lng1) - toRadians(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)))
  return dis * 6378137
  function toRadians(d) {
    return d * Math.PI / 180;
  }
}
// 格式化时间 时分秒
function time_format2(total_time) {
  var hr = fill_zero_prefix(Math.floor(total_time / 3600))
  var min = fill_zero_prefix(Math.floor((total_time - hr * 3600) / 60))
  var sec = fill_zero_prefix((total_time - hr * 3600 - min * 60))
  return hr + ":" + min + ":" + sec;
}
// 格式化时间 时分秒毫秒
function time_format() {
  ms = ms + 11
  if (ms >= 1000) {
    ms = 0
    sec = sec + 1
  }
  if (sec >= 60) {
    sec = 0
    min = min + 1
  }
  if (min >= 60) {
    min = 0
    hr = hr + 1
  }
  return fill_zero_prefix(hr) + ":" + fill_zero_prefix(min) + ":" + fill_zero_prefix(sec) + ':' + fill_zero_prefix2(ms)
}
// 小于10加上前缀0
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
// 小于100加上前缀0
function fill_zero_prefix2(num) {
  return num < 100 ? "0" + num : num
}
Page({
  data: {
    latitude: 22,
    longitude: 113,
    polyline: [],
    // time: "00:00:00:000",
    time: "00:00:00",
    meters: "0.00",
    speed: "0.00",
    accuracy: "00",
  },
  onLoad: function(options) {
    // time_format(10001)
    wx.getLocation({
      type: "gcj02",
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          accuracy: res.accuracy
        })
        // console.log(this.data.accuracy)
      }
    })
  },
  start() {
    var that = this
    clearInterval(that.timer)
    // clearInterval(that.timer2)
    that.timer = setInterval(getNewData, 1000)
    function getNewData() {
      that.getLocation(that)
      //耗时
      total_time++
      var time = time_format2(total_time)
      that.setData({
        time: time
      })
    }
    //毫秒级
    // that.timer2 = setInterval(getTime, 11)
    // function getTime() {
    //   var time = time_format2()
    //   that.setData({
    //     time: time
    //   })
    // }
    //正常
    // that.timer2 = setInterval(getTime, 1000)
    // function getTime() {
    //   total_time++
    //   var time = time_format2(total_time)
    //   that.setData({
    //     time: time
    //   })
    // }
  },
  stop() {
    clearInterval(this.timer)
    // clearInterval(this.timer2)
  },
  reset(){
    clearInterval(this.timer)
    // clearInterval(this.timer2)
    //毫秒级
    // hr=min=sec=ms=0
    total_time = 0
    newDistance = 0.00
    point = []
    this.setData({
      polyline: [],
      time: "00:00:00",
      meters: "0.00",
      speed: "0.00",
    })
  },
  getLocation(that) {
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        lat = res.latitude
        var lat5 = lat.toFixed(5)
        lon = res.longitude
        var lon5 = lon.toFixed(5)
        var len = point.length
        if (len == 0) {
          point.push({
            latitude: lat5,
            longitude: lon5
          })
        }
        len = point.length
        var lastPoint = point[len-1]
        // console.log(lastPoint.latitude)
        var distance = getDistance(lastPoint.latitude,lastPoint.longitude,lat5,lon5)
        // if(distance<1.5){
        //   distance=0.0
        // }
        newDistance = newDistance + distance
        var showDistance = newDistance.toFixed(2)
        // console.log(lastDistance)
        var showSpeed = (res.speed).toFixed(2)
        point.push({latitude: lat5,longitude: lon5})
        that.getLine(that)
        that.setData({
          meters: showDistance,
          speed: showSpeed,
          accuracy: res.accuracy,
          latitude: lat,
          longitude: lon
        })
      },
    })
  },
  getLine(that) {
    that.setData({
      polyline: [{
        points: point,
        color: '#f94e4e',
        width: 4,
        dottedLine: false
      }]
    })
  },
  goCenter(){
    wx.createMapContext("map").moveToLocation()
  }
})