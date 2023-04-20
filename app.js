var express = require('express');
const cors=require('cors');
const http =require('http');
var bodyParser=require('body-parser');
var cookiesParse=require('cookie-parser');
const path= require('path');

const routepaypal=require('./app/routes/paypal.routes');
const routelogin=require('./app/routes/login.routes');
const routerloaiphong= require("./app/routes/loaiphong.routes");
const routerkhachtro =require("./app/routes/khachtro.routes");
const routehopdong=require('./app/routes/hopdong.routes');
const routetaikhoan=require('./app/routes/taikhoan.routes');
const routenhatro=require('./app/routes/nhatro.routes');
const routephieugiahan= require('./app/routes/phieugiahan.routes');
const routegiadiennuoc=require('./app/routes/giadiennuoc.routes');
const routephong=require('./app/routes/phong.routes');
const routediennuoc=require('./app/routes/diennuoc.routes');
const routehoadon=require('./app/routes/hoadon.routes');
const routephieuthu=require('./app/routes/phieuthu.routes');
const paypal= require('paypal-rest-sdk');
const ApiError=require('./app/api_error');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookiesParse());

app.use(express.json())
app.use(cors());

//
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Tableau-Auth");
    next();
    });



app.use('/api/login',routelogin);

app.use('/api/loaiphong',routerloaiphong);
app.use('/api/khachtro',routerkhachtro);
app.use('/api/hopdong',routehopdong);
app.use('/api/taikhoan',routetaikhoan);
app.use('/api/nhatro',routenhatro);
app.use('/api/phieugiahan',routephieugiahan);
app.use('/api/diennuoc',routegiadiennuoc);
app.use('/api/phong',routephong);
app.use('/api/ghidiennuoc',routediennuoc);
app.use('/api/hoadon',routehoadon);
app.use('/api/phieuthu',routephieuthu);

app.use('/api/paypal',routepaypal);



module.exports=app;
