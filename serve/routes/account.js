var express = require('express');
var router = express.Router();


// 引入数据库链接模块（增删改查都是使用这个模块）
const connection = require('./js/connect');

// 写一个路由 同意设置响应头
router.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers",'authorization')

    next();
})

// --------token验证------------------------------------------
const secretKey = 'lulu';
const expressJwt = require('express-jwt');

router.use(expressJwt ({
    secret:secretKey
}).unless({
    path:['/login/checklogin']
}));

router.use(function(err,req,res,next){
  if(err.name==='UnauthorizedError'){
    res.status(401).send('token不合法！！！');
  }
})
// --------------------------------------------------

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
        console.log(data);
        
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

router.get('/accountlist', (req, res) => {
    const sqlStr = `select * from account order by create_date desc`;

    connection.query(sqlStr, (err, data) => {
        if (err) throw err;


        res.send(data);
    })
})

router.get('/del', (req, res) => {
    let { id } = req.query;
    const sqlStr = `delete from account where id=${id}`;

    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {

            res.send({
                code: 0,
                reason: "删除账号成功"
            })
        } else {
            res.send({
                code: 1,
                reason: "删除账号失败"
            })
        }
    })
})
router.get('/accountedit',(req,res)=>{
    let {id} =req.query;
    const sqlStr = `select * from account where id=${id}`; 
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
    // res.send('1');
    
})

router.post('/saveedit',(req,res)=>{
    let {account,userGroup,editId} = req.body;
    const sqlStr = `update account set account='${account}',user_group='${userGroup}' where id=${editId}`
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if (data.affectedRows > 0) {
			res.send({code: 0, reason: '修改账号成功!'})
		} else {
			res.send({code: 1, reason: '修改账号失败!'})
		}
    })
    
})

router.get('/batchDel',(req,res)=>{
    let {id} = req.query 
    const sqlStr = `delete from account where id in (${id})`
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if (data.affectedRows > 0) {
			res.send({code: 0, reason: '批量删除账号成功!'})
		} else {
			res.send({code: 1, reason: '批量删除账号失败!'})
		}
    })

})

router.get('/getaccountlist',(req,res)=>{
    let {currentpage,pagesize}  = req.query;
    let sqlStr = `select * from account order by create_date desc`;
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;        
        let total = data.length;
        let skip = (currentpage - 1) * pagesize;
        sqlStr += ` limit ${skip}, ${pagesize}`; 
        connection.query(sqlStr,(err,data)=>{
            if (err) throw err;
			// 把数据总条数和每个页码对应的数据发送给前端
			res.send({total, data})
        })
        
    })
})

//检验账户名重复路由
router.get("/checkaccountexist",(req,res,next) => {
    //接收参数
    let{account}=req.query;
    const sqlStr=`select * from account where account='${account}'`
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.length){
            res.send({code:1,message:"账户已存在"})
        }else{
            res.send({code:0,message:"账户名可以使用"})
        }
    })
})

router.get('/passwordmodify',(req,res)=>{
    let {value} = req.query;
    if(value === req.user.password){
        res.send({code:0,message:''})
    }
    else{
        res.send({code:1,message:'请输入正确的密码'})
    }
    
})

router.get('/comfirmmodify',(req,res)=>{
    let {password} = req.query;
    const sqlStr = `update account set password='${password}' where id=${req.user.id}`
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:'修改密码成功'})
        }
        else{
            res.send({code:1,reason:'修改密码失败'})
        }
    })

})


module.exports = router;