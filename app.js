var express = require('express');
const cors=require('cors');

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
const routephieuthu=require('./app/routes/phieuthu.routes')

const ApiError=require('./app/api_error');
var app = express();
app.use(express.json())
app.use(cors());


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

module.exports=app;
