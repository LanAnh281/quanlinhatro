const con= require('../util/mysql.util');
const ApiError=require('../api_error');

exports.layTTNT=(req,res,next)=>{
    let myquery="select * from nhatro";
    try {
        con.query(myquery,(err,result,fields)=>{
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Kết nối thất bại đến nhà trọ');
    }

}

exports.chinhsua=(req,res,next)=>{
    let myquery="UPDATE `qlnhatro`.`nhatro` SET `sdt` = ?, `hoten` = ?, `tennhatro` = ?, `diachi` = ? WHERE (`STT` = ?);";
    try {
        con.query(myquery,
            [
                req.body.sdt,
                req.body.hoten,
                req.body.tennhatro,
                req.body.diachi,
                req.params.sotk
            ],
            (err,result,fields)=>{
            if(err) throw err.stack;
            return res.send('Cập nhật thành công');
        })
    } catch (error) {
        return new ApiError(500,'Kết nối nhà trọ thất bại');
    }
}
