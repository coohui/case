Page({
  data: {
    startX: 0,
    pageX: 0,
    dircX: 0,
    ctx: null,//绘图上下文 context
    screenHeight: 0,//屏幕高
    screenWidth: 0,//屏幕宽
    left: 0,//图表位置
    index: 4,//中心点
    pointxCenter: 0,//中心点位置
    W: 1680,//画布宽
    H: 300,//画布高
    y1: 0,//线1的y值
    y2: 0,//线2的y值
    scaleData: [],//总数据
    moveData: [],//移动数据
    filterData: [],//刻度数据
    unit: 8,//每像素对应刻度
    moveUnit: 40, //没移动一下多少像素
    firstX: 40 //起始位置
  },
  onLoad: function () {
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let data = this.data;
    let index = 0;
    for (let i = -100; i <= 100; i += 1) {
      let obj = {};
      let ran = Math.random();
      let val1 = Math.round((ran * 100));
      let val2 = Math.round((ran * 200));
      val1 = val1 < 50 ? 50 : val1;
      val2 = val2 < 50 ? 50 : val2;
      obj.x = i;
      obj.uVal = i + '%';
      obj.index = index++;
      obj.v1 = val1;
      obj.v2 = val2;
      obj.y1 = data.H - val1;
      obj.y2 = data.H - val2;
      arr.push(obj);
      if (i % 10 == 0) {
        arr2.push(obj);
      }
      if (i % 5 == 0) {
        arr3.push(obj);
      }
    }

    // 获取屏幕宽高
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scaleData: arr,
          filterData: arr2,
          moveData: arr3,
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          left: -(data.W - res.windowWidth) / 2,
          pointxCenter: data.W / 2,
          index: Math.floor(arr3.length/2),
          y1: arr3[data.index].y1,
          y2: arr3[data.index].y2
        });
      }
    });
  },
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    let ctx = wx.createCanvasContext('canvas',this);
    this.setData({
      ctx: ctx
    });
    this.draw();
  },
  draw(){
    let ctx = this.data.ctx;
    let data = this.data;
    ctx.clearRect(0, 0, 1680, 260);
    this.drawLine({ key: 'y1' });
    this.drawLine({ key: 'y2', strokeStyle:'#f00' });
    this.drawCenterLine({
      ctx,
      x: data.pointxCenter,
      y1: 120,
      h1: 100,
      h2: 100
    });
    ctx.draw();
  },
  drawLine(config){
    let { key, strokeStyle = "#5ca6f6", lineWidth = 2} = config;
    let data = this.data;
    let ctx = data.ctx;
    let x = data.firstX;
    var moveData = data.moveData;

    ctx.beginPath();
    ctx.moveTo(x, moveData[0][key]);
    moveData.forEach((item, index) => {
      ctx.lineTo(index * data.moveUnit + x, item[key]);
    });

    // for (let i = 0; i < moveData.length-2; i+=2){
    //   let x2 = (i + 1) * data.moveUnit + x;
    //   let x3 = (i + 2) * data.moveUnit + x;
    //   let item = moveData[i];
    //   let item2 = moveData[i+1];
    //   let item3 = moveData[i+2];
    //   ctx.moveTo(i * data.moveUnit + x, item[key]);
    //   ctx.quadraticCurveTo(x2, item2[key], x3, item3[key]);
    // }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
    ctx.closePath();
  },
  drawCenterLine(){
    let data = this.data;
    let ctx = data.ctx;
    let H = data.H;
    let index = data.index;
    let row = data.moveData[index];
    let x = index * data.moveUnit + data.firstX -4;
    let v1 = row.v1;
    let v2 = row.v2;
    let y1 = row.y1;
    let y2 = row.y2;
    let w = 8;

    console.log(row);
    ctx.beginPath();
    //ctx.rect(x, y1, w, v1);
    //ctx.fillStyle = "#0074f1";
    //ctx.fill();

    ctx.setFillStyle("#0074f1");
    ctx.fillRect(x, y1, w, v1);
    ctx.closePath();

    ctx.beginPath();
    ctx.setFillStyle("red");
    ctx.fillRect(x, y2, w, v2 - v1);
    // ctx.rect(x, y2, w, v2-v1);
    // ctx.fillStyle = "#ff5555";
    // ctx.fill();
    ctx.closePath();
    
    let tipsx1 = x + 20; 
    let tipsy1 = y1 + v1 / 2 < 46 ? 46 : y1 + v1 / 2-10;
    let tipsx2 = x - 140; 
    let tipsy2 = (y2 + (v2 - v1) / 2) >= y1  ? (y2-30) : y2 + (v2-v1) / 2-10;
    
    if (tipsx1>=1530){
      tipsx1 = tipsx2;
//      ctx.drawImage("/common/images/left.png", tipsx1, tipsy1, 127, 23);
      //ctx.drawImage("/common/images/left.png", tipsx2, tipsy2, 127, 23);
    }else{
      // ctx.drawImage("/common/images/right.png", tipsx1, tipsy1, 127, 23);
      // ctx.drawImage("/common/images/left.png", tipsx2, tipsy2, 127, 23);
    }
    if (tipsx2<=86){
      tipsx2 = tipsx1;
     // ctx.drawImage("/common/images/right.png", tipsx1, tipsy1, 127, 23);
      // ctx.drawImage("/common/images/right.png", tipsx2, tipsy2, 127, 23);
      console.log('x1:' + tipsx1 + '  x2:' + tipsx2);
    }

    ctx.drawImage("/common/images/right.png", tipsx1, tipsy1, 127, 23);
    ctx.drawImage("/common/images/left.png", tipsx2, tipsy2, 127, 23);
    ctx.setFontSize(12);
    ctx.fillStyle = '#3f96f4';
    ctx.fillText('已解锁价值   ' + (v2 - v1), tipsx2 + 10, tipsy2 + 16);
    ctx.fillText('未解锁价值   ' + v1, tipsx1 + 10, tipsy1 + 16);
    ctx.drawImage("/common/images/point-red.png", x - 6, y2 - 10, 20, 20);
    ctx.drawImage("/common/images/point-blue.png", x - 6, y1 - 10, 20, 20);

  },
  touchstart(e) {
    this.setData({
      startX: e.touches[0].pageX,
      dircX: 0
    });
  },
  touchend(e) {
    console.log(this.data.index);
    let data = this.data;
    let dircX = data.dircX;
    let moveData = data.moveData;
    let left = data.left + (dircX * 40);
    let index = data.index - dircX;
    if (index >= 0 && index < moveData.length) {
      this.setData({
        left: left,
        index: index
      });
      this.draw({ x: left });
    }
  },
  touchmove(e) {
    let pageX = Math.abs(e.touches[0].pageX);
    let startX = Math.abs(this.data.startX);

    if (pageX < startX) {//左
      this.setData({
        dircX: -1,
      });
    } else {//右
      this.setData({
        dircX: 1,
      });
    }
  }
})





// const app = getApp()
// var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
// var Shape = require("../../utils/wxdraw.min.js").Shape;
// var AnimationFrame = require("../../utils/wxdraw.min.js").AnimationFrame;
// var rectArr = [];

// Page({
//   data: {
//     ctx: null,//绘图上下文 context
//     dircX: 0,
//     startX: 0,
//     pageX: 0,

//     screenHeight: 0,//屏幕高
//     screenWidth: 0,//屏幕宽
//     left: 0,//图表位置
//     index: 4,//中心点
//     pointxCenter: 0,//中心点位置
//     W: 400,//画布宽
//     H: 260,//画布高
//     y1:0,//线1的y值
//     y2:0,//线2的y值
//     scaleData: [],//总数据
//     moveData:[],//移动数据
//     filterData:[],//刻度数据
//     unit: 40,//每像素对应刻度
//     firstX:40 //起始位置
//   },
//   onLoad: function () {
//     this.initData();
//     let data = this.data;
//     this.context = wx.createCanvasContext('canvas')
//     this.wxCanvas = new wxDraw(this.context, 0, 0, data.W, data.H);
//     this.draw();
//   },
//   initData(){
//     let arr = [];
//     let arr2 = [];
//     let arr3 = [];
//     let data = this.data;
//     let index = 0;
//     for (let i = -20; i <= 20; i+=5) {
//       let obj = {};
//       let ran = Math.random();
//       let val1 = Math.round((50 + i + ran * 20));
//       let val2 = Math.round((140 + i + ran * 40));

//       obj.x = i;
//       obj.uVal = i + '%';
//       obj.index = index++;
//       obj.v1 = val1;
//       obj.v2 = val2;
//       obj.y1 = data.H - val1;
//       obj.y2 = data.H - val2;
//       arr.push(obj);
//       if(i % 10 == 0){
//         arr2.push(obj); 
//       }
//       if (i % 5 == 0){
//         arr3.push(obj);  
//       }
//     }

//     // 获取屏幕宽高
//     var _this = this;
//     wx.getSystemInfo({
//       success: function (res) {
//         _this.setData({
//           scaleData: arr,
//           filterData: arr2,
//           moveData: arr3,
//           screenHeight: res.windowHeight,
//           screenWidth: res.windowWidth,
//           left: -(data.W - res.windowWidth) / 2,
//           pointxCenter: data.W / 2,
//           y1: arr3[data.index].y1,
//           y2: arr3[data.index].y2
//         });
//       }
//     });
//   },
//   draw() {
//     this.drawLine();
//     this.drawCenterRect();
//   },
//   drawLine() {
//     let data = this.data;
//     let scaleData = data.scaleData;
//     let moveData = data.moveData;
//     let pointCenter = moveData.index;
//     let points = scaleData.map((item, index) => {
//       return [index * data.unit + data.firstX, item.y1]
//     });
//     let points2 = scaleData.map((item,index) => {
//       return [index * data.unit + data.firstX, item.y2]
//     });

//     let line = new Shape('line', {
//       points: points,
//       strokeStyle: "#5ca6f6", lineWidth: 2
//     },'fill', true);//线一

//     let line2 = new Shape('line', {//线二
//       points: points2,
//       strokeStyle: "#5ca6f6", lineWidth: 2},'fill', true);

//     this.wxCanvas.add(line);
//     this.wxCanvas.add(line2);
//   },
//   drawCenterRect() {
//     let data = this.data;
//     let H = data.H;
//     let index = data.index;
//     let row = data.moveData[index];
//     let x = index*40+40;
//     let v1 = row.v1;
//     let v2 = row.v2;
//     let y1 = row.y1+v1/2;
//     let y2 = row.y2+v2/2;
//     var rect = new Shape('rect', { x: x, y:y1, w: 8, h: v1, fillStyle: "#0074f1" }, 'fill', true);
//     var rect2 = new Shape('rect', { x: x, y: y2, w: 8, h: v2, fillStyle: "#ff5555" }, 'fill', true);
//     this.wxCanvas.add(rect2);
//     this.wxCanvas.add(rect);
//     rectArr[0] = rect;
//     rectArr[1] = rect2;
//     console.log(data.moveData);
//   },
//   moveRect(config){
//     let { dircX ,index } = config;
//     let data = this.data;
//     let moveData = data.moveData;
//     let x = dircX > 0 ? '-=40' : '+=40';
//     let dy = (data.y1 - moveData[index].y1);
//     if (dy>0){
//       let h = '+=' + dy;
//       let y = '+=' + dy;
//     }else{
//       let h = '-=' + dy;
//       let y = '-=' + dy;
//     }

//     console.log(data.y1);
//     console.log(moveData[index].y1);
//     rectArr.forEach(function(item){
//       item.animate({x:x,y:'+=10',h:'+=10'}, { duration: 1000 }).start();
//     });
//   },
//   touchstart(e) {
//     this.setData({
//       startX: e.touches[0].pageX,
//       dircX: 0
//     });
//   },
//   touchend(e) {
//     let dircX = this.data.dircX;
//     let left = this.data.left + (dircX * 40);
//     let index = this.data.index - dircX*2;
//     this.setData({
//       left: left,
//       index: index
//     });
//     console.log(index);
//     if (dircX != 0){
//       this.moveRect({ dircX: dircX, index: index });
//     }
//   },
//   touchmove(e) {
//     let pageX = Math.abs(e.touches[0].pageX);
//     let startX = Math.abs(this.data.startX);

//     if (pageX < startX) {//左
//       this.setData({
//         dircX: -1,
//       });
//     } else {//右
//       this.setData({
//         dircX: 1,
//       });
//     }
//   },
//   onUnload: function () {
//     this.wxCanvas.clear(); //推荐这个
//   },
  // onReady: function (e) {
  //   // 使用 wx.createContext 获取绘图上下文 context
  //   let ctx = wx.createCanvasContext('canvas', this);
  //   let x = 200;
  //   let y = 260;
  //   this.setData({
  //     ctx: ctx
  //   });
  //   this.draw({ x, y });
  // },
  // draw(config) {
  //   let { x = 40, y = 260 } = config;
  //   let ctx = this.data.ctx;
  //   ctx.clearRect(0, 0, 1680, 260);
  //   this.drawLine({ key: 'y1' });
  //   this.drawLine({ key: 'y2' });
  //   this.drawCenterLine({
  //     ctx,
  //     x: x,
  //     y1: 120,
  //     h1: 100,
  //     h2: 100
  //   });
  //   // ctx.beginPath();
  //   // ctx.moveTo(0, 0);
  //   // ctx.quadraticCurveTo(50, 160, 100, 60);
  //   // ctx.quadraticCurveTo(150, 200, 200, 100);
  //   // ctx.strokeStyle = "#f40";
  //   // ctx.stroke();
  //   // context.setStrokeStyle("#00ff00")
  //   // context.setLineWidth(5)
  //   // context.rect(0, 0, 200, 200)
  //   // context.stroke()
  //   // context.setStrokeStyle("#ff0000")
  //   // context.setLineWidth(2)
  //   // context.moveTo(160, 100)
  //   // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
  //   // context.moveTo(140, 100)
  //   // context.arc(100, 100, 40, 0, Math.PI, false)
  //   // context.moveTo(85, 80)
  //   // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
  //   // context.moveTo(125, 80)
  //   // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
  //   // context.stroke()
  //   ctx.draw();
  // },
  // drawLine(config) {
  //   let { key, x = 40, y = 260, fillStyle, strokeStyle = "#5ca6f6", alpha, lineWidth = 2, unit = 80 } = config;
  //   let ctx = this.data.ctx;
  //   let data = this.data.scaleData;
  //   console.log(data);
  //   ctx.beginPath();
  //   ctx.moveTo(x, y - data[0][key]);
  //   data.forEach((item, index) => {
  //     ctx.lineTo(index * unit + x, y - item[key]);
  //   });
  //   ctx.lineWidth = lineWidth;
  //   ctx.strokeStyle = strokeStyle;
  //   ctx.stroke();
  //   ctx.closePath();
  //   ctx.restore();
  // },
  // drawCenterLine(config) {
  //   let { ctx, x, y1, h1, y2, h2 } = config;
  //   let w = 8;
  //   ctx.beginPath();
  //   ctx.rect(x - 4, y1, w, h1);
  //   ctx.fillStyle = "#ff5555";
  //   ctx.fill();
  //   ctx.closePath();
  //   ctx.beginPath();
  //   ctx.rect(x - 4, y1 + h1, w, h2);
  //   ctx.fillStyle = "#0074f1";
  //   ctx.fill();
  //   ctx.closePath();
  // },
  // onLoad: function () {
  //   let arr = [];
  //   for (let i = -100; i <= 100; i += 10) {
  //     let obj = {};
  //     let ran = Math.random();
  //     obj.x = i + '%';
  //     obj.y1 = Math.round((50 + i + ran * 20));
  //     obj.y2 = Math.round((140 + i + ran * 40));
  //     arr.push(obj);
  //   }
  //   // 获取屏幕宽高
  //   var _this = this;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       _this.setData({
  //         scaleData: arr,
  //         screenHeight: res.windowHeight,
  //         screenWidth: res.windowWidth,
  //         left: -(arr.length / 2 * 80 - res.windowWidth / 2)
  //       });
  //     }
  //   });
  //   console.log(this.data);
  //   // this.setData({
  //   //   scaleData: arr,
  //   //   left: -(arr.length / 2 * 80)
  //   // });
  // },
  // ctxstart(e) {
  //   console.log(e);
  // },
  // handletouchmove: function (event) {
  //   let pageX = event.touches[0].pageX;
  //   let pageY = event.touches[0].pageY;
  //   console.log('x:' + pageX + 'y:' + pageY);
  //   //屏幕边界判断   中心点位置
  //   if (pageX < 30 || pageY < 30)
  //     return;
  //   if (pageX > this.data.screenWidth - 30)
  //     return;
  //   if (pageY > this.data.screenHeight - 30)
  //     return;

  //   //左上角位置
  //   this.setData({
  //     ballTop: event.touches[0].pageY - 30,
  //     ballLeft: event.touches[0].pageX - 30,
  //   });

  // }
// })


