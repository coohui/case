var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    msg: 'Hello World33',
    toView: 'blue',
    scrollTop: 100,
    chooseImg:''
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
  chooseImg(){
    let that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          chooseImg: tempFilePaths
        })
        console.log(tempFilePaths);
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
