var express = require('express');
const cors=require('cors');

const routerloaiphong= require("./app/routes/loaiphong.routes");
const routerkhachtro =require("./app/routes/khachtro.routes");
const routehopdong=require('./app/routes/hopdong.routes');
const routetaikhoan=require('./app/routes/taikhoan.routes');
const ApiError=require('./app/api_error');
var app = express();
app.use(express.json())
app.use(cors());


app.use('/api/loaiphong',routerloaiphong);
app.use('/api/khachtro',routerkhachtro);
app.use('/api/hopdong',routehopdong);
app.use('/api/taikhoan',routetaikhoan);

module.exports=app;
