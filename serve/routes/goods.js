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



router.post('/goodsadd',(req,res)=>{
  let {name,goodsClass,barcode,price,discount,desc} = req.body;
  const sqlStr = `insert into goods(goods_name,goods_class,barcode,price,discount,goods_desc) values('${name}','${goodsClass}','${barcode}',${price},'${discount}','${desc}')`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.affectedRows>0){
      res.send({code:0,reason:'添加成功'})
    }
    else{
      res.send({code:1,reason:'添加失败'})

    }
  })
  
})


router.get('/del',(req,res)=>{
  let{id} = req.query;
  const sqlStr = `delete from goods where id=${id}`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.affectedRows>0){
      res.send({code:0,reason:'删除成功'})
    }
    else{
      res.send({code:1,reason:'删除失败'})
    }
  })
})

router.get('/edit',(req,res)=>{
  let {id} = req.query;
  const sqlStr = `select * from goods where id=${id}`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.length>0){
      res.send(data)
    }
    
  })
})

router.post('/saveedit',(req,res)=>{
      let{goods_class,barcode,goods_name,price,discount,goods_desc,id} = req.body
      const sqlStr = `update goods set goods_name='${goods_name}',goods_class='${goods_class}',barcode='${barcode}',price=${price},discount='${discount}',goods_desc='${goods_desc}' where id=${id}`
      connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
          res.send({code:0,reason:'修改成功'})
        }
        else{
          res.send({code:1,reason:'修改失败'})
        }
      })
})

router.get('/batchdel',(req,res)=>{

  let{selectedIds} = req.query;
  const sqlStr = `delete from goods where id in (${selectedIds})`
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.affectedRows>0){
      res.send({code:0,reason:'批量删除成功'});
    }
    else{
      res.send({code:1,reason:'批量删除失败'})
    }
  })

})


router.get('/goodslist',(req,res)=>{
  let {currentpage,pagesize,goods_class,keyword}  = req.query;
  // console.log(req.query);
  
  let sqlStr = `select * from goods where 1=1`;
  if(goods_class!=='all'&&goods_class!==''){
    sqlStr += ` and goods_class='${goods_class}'`;
  }
  if (keyword !== '') {
		sqlStr += ` and(goods_name like '%${keyword}%' or barcode like '%${keyword}%')`
	}
  sqlStr += ` order by id desc`;
 
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

module.exports = router;
