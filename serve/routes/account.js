var express = require('express');
var router = express.Router();


// 引入数据库链接模块（增删改查都是使用这个模块）
const connection = require('./js/connect');

// 写一个路由 同意设置响应头
router.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
})

router.post('/accountadd', (req, res) => {
    let {
        account,
        password,
        userGroup
    } = req.body;
    // 写sql
    const sqlStr = `insert into account(account,password,user_group) values('${account}','${password}','${userGroup}')`;
    // 执行sql
    console.log(sqlStr);
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {

            res.send({
                code: 0,
                reason: "添加账号成功"
            })
        } else {
            res.send({
                code: 1,
                reason: "添加账号失败"
            })
        }
    })
})

router.get('/accountlist',(req,res)=>{
    const sqlStr = `select * from account order by create_date desc`;

    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        console.log(data);
        
        res.send(data);
    })

    // res.send("1")
})




module.exports = router;