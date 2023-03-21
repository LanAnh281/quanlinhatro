const ApiError = require("../api_error");
const con = require("../util/mysql.util");

//Lấy DS hóa đơn
exports.layDSHD = (req, res, next) => {
  let DSHD = "select * from hoadon;";
  let DSHDThang = "select * from hoadon where thang=?;";
  let DSHDPhong = "select * from hoadon where maphong=?;";
  let DSHDPhongThang = "select * from hoadon where maphong=? and thang=?;";
  try {
    if (req.query.thang && req.query.maphong) {
      con.query(
        DSHDPhongThang,
        [req.query.maphong, req.query.thang],
        function (err, result, filters) {
          if (err) throw err.stack;
          return res.send(result);
        }
      );
    } else if (req.query.thang) {
      con.query(DSHDThang, req.query.thang, function (err, result, filters) {
        if (err) throw err.stack;
        return res.send(result);
      });
    } else if (req.query.maphong) {
      con.query(DSHDPhong, req.query.maphong, function (err, result, filters) {
        if (err) throw err.stack;
        return res.send(result);
      });
    } else {
      con.query(DSHD, function (err, result, filters) {
        if (err) throw err.stack;
        return res.send(result);
      });
    }
  } catch (error) {
    return new ApiError(500, "Không kết nối với hóa đơn");
  }
};

//tạo hóa đơn cho 1 phòng
exports.taoHD = (req, res, next) => {
  let themHD =
    "INSERT INTO `qlnhatro`.`hoadon` (`thang`, `maphong`, `tongtien`, `trangthai`) VALUES (?, ?, ?, 'chưa thanh toán');";
  try {
    if (req.query.maphong) {
      con.query(
        themHD,
        [req.body.thang, req.query.maphong, req.body.tongtien],
        function (err, result, filters) {
          if (err) throw err.stack;
          return res.send("Tạo thành công hóa đơn");
        }
      );
    } else {
      con.query(
        themHD,
        [req.body.thang, req.body.maphong, req.body.tongtien],
        function (err, result, filters) {
          if (err) throw err.stack;
          return res.send("Tạo thành công hóa đơn");
        }
      );
    }
  } catch (error) {
    return new ApiError(500, "Không kết nối với hóa đơn");
  }
};
//chỉnh sửa hóa đơn cho 1 phòng tại 1 tháng
exports.chinhsuaHDTheoKHTheoThang = (req, res, next) => {
  let myquery =
    "UPDATE `qlnhatro`.`hoadon` SET `thang` = ?, `maphong` = ?, `tongtien` = ?, `trangthai` =? WHERE (`mahd` = ?);";
  try {
    con.query(
      myquery,
      [
        req.body.thang,
        req.body.maphong,
        req.body.tongtien,
        req.body.trangthai,
        req.params.mahd,
      ],
      function (err, result, filters) {
        if (err) throw err.stack;
        return res.send("chỉnh sửa thành công");
      }
    );
  } catch (error) {
    return new ApiError(500, "Không kết nối với hóa đơn");
  }
};
//xóa 1 hóa đơn của 1 phòng tại 1 tháng
exports.xoaHD = (req, res, next) => {
  let xoaHD = "DELETE FROM `qlnhatro`.`hoadon` WHERE (`mahd` = ?);  ";
  let xoaHDPhong="delete from hoadon where maphong=?;";
  let xoaHDThang="delete from hoadon where thang=?;";
  try {
    if(req.query.maphong){
    con.query(xoaHDPhong, req.query.maphong, function (err, result, filters) {
      if (err) throw err.stack;
      return res.send("xóa thành công hóa đơn của phòng");
    });}
    else if(req.query.thang){
        con.query(xoaHDThang, req.query.thang, function (err, result, filters) {
            if (err) throw err.stack;
            return res.send("xóa thành công hóa đơn của tháng");
          });
    }
    else {
        con.query(xoaHD, req.params.mahd, function (err, result, filters) {
            if (err) throw err.stack;
            return res.send("xóa thành công hóa đơn");
          });
    }
  } catch (error) {
    return new ApiError(500, "Không kết nối với hóa đơn");
  }
};



