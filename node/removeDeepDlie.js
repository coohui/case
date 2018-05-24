/*
  把该文件放到当前磁盘
*/
var fs = require('fs');
var removePath = '/Users/Administrator/Desktop/file';  //要删除的路径
var removeDir = function(pathNew, pathOrig) {
    fs.readdirSync(pathNew).forEach(function(file, index){
        var curPath = pathNew + '/' + file;
        if(fs.statSync(curPath).isDirectory()) {
            var newPath = curPath.replace(/\/[^\/]*?$/, '/' + index);
            fs.renameSync(curPath, newPath);
            removeDir(newPath, pathOrig + '/' + file);
        } else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(pathNew);
    console.log('\x1b[31m DELETE \x1b[0m\x1b[34m' + pathOrig + '\x1b[0m\r\n\x1b[33m AS \x1b[0m' + pathNew + '\r\n');
}
removeDir(removePath, removePath);
console.log("执行完成！");