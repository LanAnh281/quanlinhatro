var express = require('express');
const cors=require('cors');
const routerchutro= require("./app/routes/chutro.routes");
const routerloaiphong= require("./app/routes/loaiphong.routes");
const routerkhachtro =require("./app/routes/khachtro.routes");
const routehopdong=require('./app/routes/hopdong.routes');
const ApiError=require('./app/api_error');
var app = express();
app.use(express.json())
app.use(cors());

app.use('/api/chutro',routerchutro);

app.use('/api/loaiphong',routerloaiphong);
app.use('/api/khachtro',routerkhachtro);
app.use('/api/hopdong',routehopdong);

module.exports=app;
