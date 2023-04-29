// var mysql = require('./app/util/mysql.util');
const config = require('./app/config');
const app=require("./app");


app.listen(config.app.port,function(){
    console.log(`Node server running @ http://localhost:${config.app.port}`)
});



  