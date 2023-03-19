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
// tạo tài khoản khách trọ
exports.taoTK = (req, res, next) => {
  let taotk =
    "INSERT INTO `qlnhatro`.`taikhoan` (`matk`, `matkhau`, `quyen`,`handung`) VALUES ( (select newTK()), (select randomPassword()), '0','1');";
  let themTK =
    "INSERT INTO `qlnhatro`.`khachhang` (`STT`, `sdt`, `cccd`, `hoten`, `nghenghiep`, `quequan`) VALUES (?, ?, ?, ?, ?, ?);";

  try {
    con.query(taotk, function (err, results, fields) {
      if (err) throw err.stack;
      let lastID = results.insertId;
      con.query(themTK, [
        lastID,
        req.body.sdt,
        req.body.cccd,
        req.body.hoten,
        req.body.nghenghiep,
        req.body.quequan,
      ]);

      return res.send("Tạo thanh công");
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
//Lấy chi tiết của 1 tài khoản
exports.lay1TK = (req, res, next) => {
  let myquery = 'call hiends("khachhang")';
  let sotk = req.params.sotk;
  try {
    con.query(myquery, sotk, function (err, result, fields) {
      if (err) throw err.stack;
      return res.send(result[0]);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};
// chỉnh sửa 1 tài khoản
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
        return res.send("Chỉnh sửa thành công");
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối với tài khoản thất bại");
  }
};

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
