const con = require('../util/mysql.util');
const ApiError= require('../api_error');

exports.layDS=(req,res,next)=>{
    let myquery=`select maphieu,kh.STT,kh.hoten,trangthai,date_format(ngaybd,'%d-%m-%Y') as ngaybd ,date_format(ngaykt,'%d-%m-%Y') as ngaykt 
    from phieugiahan p join khachhang kh on p.stt_kh=kh.stt;
  `;
    try {
        con.query(myquery,function(err, result,filters){
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Kết nối phiếu gia hạn thất bại');
    }
}
//tạo phiếu gia hạn
exports.taophieu=(req,res,next)=>{
    let myquery="INSERT INTO `qlnhatro`.`phieugiahan` (`stt_kh`, `ngaybd`, `ngaykt`,`trangthai`) VALUES (?, ?, ?,'0');";
    try {
        con.query(myquery,
            [
                req.params.sotk,
                req.body.ngaybd,
                req.body.ngaykt
            ],
            function(err,result,filters){
                if(err) throw err.stack;
                return res.send('tao thanh cong phieu');
            }
        )
    } catch (error) {
        return new ApiError(500,'Kết nối phiếu gia hạn thất bại');
    }
}
// chỉnh sửa trạng thái của phiếu =1
exports.chinhsua=(req,res,next)=>{
   let myquery=" UPDATE `qlnhatro`.`phieugiahan` SET `trangthai` = '1' WHERE (`maphieu` = ?);";
    try {
        con.query(myquery,req.query.maphieu,function(err,result,filters){
            if(err) throw err.stack;
            return res.send('Cập nhật trạng thái phiếu thành công');
        })
    } catch (error) {
        return new ApiError(500,'Kết nối phiếu gia hạn thất bại');
    }
}
//Lay ds phiếu theo sotk
exports.layDSPhieu=(req,res,next)=>{
    let myquery="select * from phieugiahan where stt_kh=?";
    try {
        con.query(myquery,req.params.sotk,function(err, result,filters){
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Kết nối phiếu gia hạn thất bại');
    }
}
//Xóa phiếu gia hạn
exports.xoaPhieu=(req,res,next)=>{
    let myquery= "DELETE FROM `qlnhatro`.`phieugiahan` WHERE (`maphieu` = ?);";

    try {
        con.query(myquery,req.query.maphieu,(err,result,filters)=>{
            if(err) throw err.stack;
            return res.send("xóa thành công phiếu");
        })
    } catch (error) {
        
    }
}