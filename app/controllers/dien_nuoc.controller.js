const con= require('../util/mysql.util');
const ApiError=require('../api_error');

exports.layTT= (req,res,next)=>{
    let myquery="select * from giadien_nuoc";
    try {
        con.query(myquery,function(err,result, field){
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Không kết nối với điện nước');
    }
}
//Thêm mới giá điện nước
exports.themTT= (req,res,next)=>{
    let myquery="INSERT INTO `qlnhatro`.`giadien_nuoc` (`thoidiem`, `giadien`, `gianuoc`) VALUES (?, ?, ?);";
    var today = new Date();
    var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
    var dateTime = date + " " + time;

    try {
        con.query(myquery,
            [dateTime,req.body.giadien,req.body.gianuoc],
            function(err,result, field){
            if(err) throw err.stack;
            return res.send('Thêm giá điện nước thành công');
        })
    } catch (error) {
        return new ApiError(500,'Không kết nối với điện nước');
    }
}