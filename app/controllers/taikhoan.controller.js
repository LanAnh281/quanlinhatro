const ApiError =require('../api_error');
const con= require('../util/mysql.util');
//Lay ds tai khoan
exports.layDSTK= (req,res,next)=>{
    let myquery="select  * from taikhoan ";
    try {
        con.query(myquery,(err,result,filters)=>{
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Ket noi tai khoan that bai');
    }
}
//lay 1 tai khoan
exports.layTK= (req,res,next)=>{
    let myquery="select  * from taikhoan where STT=?; ";
    try {
        con.query(myquery,req.params.sotk,(err,result,filters)=>{
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Ket noi tai khoan that bai');
    }
}
//Cap nhat mat khau cua 1 tai khoan
exports.capnhatMK=(req,res,next)=>{
    console.log("STT",req.data.STT);

let myquery="UPDATE `qlnhatro`.`taikhoan` SET `matkhau` = md5(?) WHERE (`STT` = ?);";
try {
    con.query(myquery,[req.body.mk,req.data.STT],(err,result,filters)=>{
        if(err) throw err.stack;
        return res.send('Cap nhat mat khau thanh cong');
    })
} catch (error) {
    return new ApiError(500,'Ket noi tai khoan that bai');
}
}
//Cap nhat quyen cua 1 tai khoan
exports.capnhatQuyen=(req,res,next)=>{
    let myquery="UPDATE `qlnhatro`.`taikhoan` SET `quyen` = ? WHERE (`STT` = ?);";
    try {
        con.query(myquery,[req.params.quyen,req.params.sotk],(err,result,filters)=>{
            if(err) throw err.stack;
            return res.send('Cap nhat quyen thanh cong');
        })
    } catch (error) {
        return new ApiError(500,'Ket noi tai khoan that bai');
    }
    }
//xóa 1 tài khoản
exports.xoaTK = (req, res, next) => {
    let xoaTK =
      "UPDATE `qlnhatro`.`taikhoan` SET  `handung` = '0' WHERE (`STT` = ?);";
    try {
      con.query(xoaTK, req.params.sotk, function (err, result, fields) {
        if (err) throw err.stack;
        return res.send("xóa tài khoản khách hàng thành công");
      });
    } catch (error) {
      return new ApiError(500, "Kết nối với tài khoản thất bại");
    }
  };