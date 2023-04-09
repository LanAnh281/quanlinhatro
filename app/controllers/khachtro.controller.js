const ApiError = require("../api_error");
const con = require("../util/mysql.util");

//Lấy ds khách hàng
exports.layTK = (req, res, next) => {
  let myquery =
    "select * from taikhoan tk join khachhang kh on tk.stt=kh.stt where quyen='0';";
  try {
    con.query(myquery, function (err, result) {
      return res.send(result);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//Lấy chi tiết của 1 tài khoản
exports.lay1TK = (req, res, next) => {
  let myquery =
    "select * from taikhoan tk join khachhang kh on tk.stt=kh.stt where quyen='0' and kh.stt=?;";
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
  let newpass = "select randompassword ();";
  let taotk =
    "INSERT INTO `qlnhatro`.`taikhoan` (`matk`, `matkhau`, `quyen`,`handung`) VALUES ( (select newTK()), md5(?), '0','1');";
  let themTK =
    "INSERT INTO `qlnhatro`.`khachhang` (`STT`, `sdt`, `cccd`, `hoten`, `nghenghiep`, `quequan`) VALUES (?, ?, ?, ?, ?, ?);";

  try {
    con.query(newpass, function (err, result, field) {
      // console.log(Object.values(result[0]));
      con.query(taotk, Object.values(result[0]), function (err, results, fields) {
        if (err) throw err.stack;
        const lastID = results.insertId;
        con.query(themTK, [
          lastID,
          req.body.sdt,
          req.body.cccd,
          req.body.hoten,
          req.body.nghenghiep,
          req.body.quequan,
        ]);
        
        return res.json({
        "pass":Object.values(result[0]),
        message:"Thành công",
        "ID":"MS"+lastID,
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
    "UPDATE `qlnhatro`.`khachhang` SET `sdt`=?, `cccd` = ?, `hoten` = ?, `nghenghiep` = ?, `quequan` = ? WHERE (`STT` = ?);";
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
