//引入mysql
const mysql = require('mysql')
//创建链接对象
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'supermarket'
})
//执行链接方法
connection.connect();

console.log('链接数据库成功');

//暴露模块（暴露数据库链接模块）
module.exports = connection;
