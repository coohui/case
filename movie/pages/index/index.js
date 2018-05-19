var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    msg: 'Hello World33',
    toView: 'blue',
    scrollTop: 100
  },
  getLocal:function(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 经度
        var longitude = res.longitude // 纬度
        console.log(latitude + longitude);
      },
      fail:  () => {
        console.log('获取失败！');
      }
    })
  },
  scan:() =>{
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  upper: function (e) {
    //console.log('upper')
  },
  lower: function (e) {
    //console.log('lower')
  },
  scroll: function (e) {
    //console.log('scroll')
  },
  tap: function (e) {
    console.log(e);
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
