module.exports = {
  //输入框验证
  validate:(data,type='noValidate') => {
      let map={
       tel:data => {
         let str = String(data);
         let re = /^1\d{10}/g;
         var result={
           success:false,
           inf:''
         };
         if (str == '') {
           result.inf = '请先输入手机号!';
         } else if (re.test(str)) {
           result.success = true;
         } else {
           result.inf = '手机号码有误!';
         }
         return result
       },
       noValidate:data => {
         return true
       }
      }
      return map[type](data)
  },
  //转千分符
  toUnit:(str) => {
    //匹配不包括开头的后面是以3个数字结尾的可以最少出现一次的边界位置
    var re = /(?=(?!\b)(\d{3})+$)/g;
    return str.replace(re, ',')
  },
  showSuccess:(text) => {
    wx.showToast({
      title: text,
      icon: 'loading',
      duration: 10000
    })
  }
}