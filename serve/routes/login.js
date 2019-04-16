var express = require('express');
var router = express.Router();

// 引入数据库链接模块（增删改查都是使用这个模块）
const connection = require('./js/connect');

const jwt = require('jsonwebtoken');



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

router.post('/checklogin',(req,res)=>{
  let {account,password} = req.body;
  const sqlStr = `select * from account where account='${account}' and password = '${password}'`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    
    if (data.length){

      // 在登录成功的路由中生成token 
      const token = jwt.sign(Object.assign({},data[0]),secretKey,{expiresIn:60*60*2})
      
      res.send({code:0,reason:'登录成功',token});
    }
    else{
      res.send({code:1,reason:'请检查账号密码'})
    }
    
  })
  
})


router.get('/currentaccount',(req,res)=>{

  res.send(req.user.account)
})
module.exports = router;
