const ApiError = require("../api_error");
const con = require("../util/mysql.util");

const express = require('express');
const app = express();
const Resize = require('./Resize');
const upload = require('./uploadMiddleware');
//Lấy ds khách hàng
exports.layTK = (req, res, next) => {
  let myquery =
    "select * from taikhoan tk join khachhang kh on tk.stt=kh.stt where quyen='0' and handung='1';";
  try {
    con.query(myquery, function (err, result) {
      return res.send(result);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//Lấy chi tiết của 1 khách trọ
exports.lay1TK = (req, res, next) => {
  let myquery =
    "select * from taikhoan tk join khachhang kh on tk.stt=kh.stt where quyen='0' and kh.stt=? and handung='1';";
  try {
    con.query(myquery, req.params.sotk,function (err, results) {
      return res.json(Object(results[0]));
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
// tạo tài khoản khách trọ
exports.taoTK = (req, res, next) => {
  // console.log("req.data.name:",req.data.name);
  let newpass = "select randompassword ();";
  let taotk =
    "INSERT INTO `qlnhatro`.`taikhoan` (`matk`, `matkhau`, `quyen`,`handung`,`mk`) VALUES ( (select newTK()), md5(?), '0','1',?);";
  let themTK =
    "INSERT INTO `qlnhatro`.`khachhang` (`STT`, `sdt`, `cccd`, `hoten`, `nghenghiep`, `quequan`,`anhCCCD`) VALUES (?, ?, ?, ?, ?, ?,?);";
  
  try {
    con.query(newpass, function (err, result, field) {
      console.log(Object.values(result[0]));
      con.query(taotk, [Object.values(result[0]),Object.values(result[0])], function (err, results, fields) {
        if (err) throw err.stack;
        const lastID = results.insertId;
        con.query(themTK, [
          lastID,
          req.body.sdt,
          req.body.cccd,
          req.body.hoten,
          req.body.nghenghiep,
          req.body.quequan,
          req.data.name
        ]);
        
        // return res.redirect('http://localhost:3001/khachhang')
       res.json({
        "pass":Object.values(result[0]),
        message:"Thành công",
        "ID":"MS"+lastID,
        "STT":lastID
      })
      });
      
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//

// chỉnh sửa 1  khach tro
exports.chinhsuaTK = (req, res, next) => {
  let chinhsuaTK =
    "UPDATE `qlnhatro`.`khachhang` SET `sdt`=?, `cccd` = ?, `hoten` = ?, `nghenghiep` = ?, `quequan` = ?,  `anhcccd`=? WHERE (`STT` = ?);";
  try {
    con.query(
      chinhsuaTK,
      [
        req.body.sdt,
        req.body.cccd,
        req.body.hoten,
        req.body.nghenghiep,
        req.body.quequan,
        req.data.name,
        req.params.sotk,
      ],
      function (err, results, fields) {
        if (err) throw err.stack;
        return res.json({
          chinhsua:"capnhat thanhcong"
        });
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//xóa 
exports.xoaTK = (req, res, next) => {
  let myquery =`UPDATE taikhoan SET handung = '0' WHERE (STT = ?);`;
  try {
    con.query(
      myquery,
      [
       req.params.sotk
      ],
      function (err, results, fields) {
        if (err) throw err.stack;
        return res.json({
          xoa:"xoa thanhcong"
        });
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//lấy khách trọ 
exports.layKT = (req, res, next) => {
  
  let myquery =
    "select * from taikhoan tk join khachhang kh on tk.stt=kh.stt where quyen='0' and kh.stt=? and handung='1';";
  try {
    con.query(myquery, req.data.STT,function (err, results) {
      return res.json(Object(results[0]));
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//chỉnh sửa k ảnh
exports.chinhsuaKhongAnhTK = (req, res, next) => {
  // console.log("req.body:",req.body);
  let chinhsuaTK =`
  UPDATE khachhang SET sdt=?, 
  cccd = ?, hoten = ?, nghenghiep = ?, 
  quequan = ? WHERE (STT = ?);`;
    try {
    con.query(
      chinhsuaTK,
      [
        req.body.sdt,
        req.body.cccd,
        req.body.hoten,
        req.body.nghenghiep,
        req.body.quequan,
        req.params.sotk,
      ],
      function (err, results, fields) {
        if (err) throw err.stack;
        return res.json({
          chinhsua:"capnhat thanhcong"
        });
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};

//tìm kiếm khách hàng
exports.timkiem=(req,res)=>{
  let myquery=`select * from khachhang where hoten like "%"?"%";`;
  console.log(req.body);
  try {
    con.query(myquery,req.body.hoten,function(err,result){
      if(err) throw err.stack;
      return res.send(result);
    })
  } catch (error) {
    res.send("Lỗi");
  }
}