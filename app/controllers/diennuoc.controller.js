const con = require("../util/mysql.util");
const ApiError = require("../api_error");

//Lấy thông tin giá điện
exports.layDSDN = (req, res, next) => {
  let myquery = `select maphong,
  date_format(thoigianghi,'%Y-%m-%d') as thoigianghi ,
  dienchisocu,
  dienchisomoi,
  nuocchisocu,
  nuocchisomoi from dien_nuoc`;
  try {
    con.query(myquery, function (err, result, fields) {
      if (err) throw err.stack;
      return res.send(result);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối đến điện nước thất bại");
  }
};

// Thêm giá điện nước
exports.themDN = (req, res, next) => {
  let myquery =
    "INSERT INTO `qlnhatro`.`dien_nuoc` (`maphong`, `thoigianghi`, `dienchisocu`, `dienchisomoi`, `nuocchisocu`, `nuocchisomoi`) VALUES (?, ?, ?, ?, ?, ?);";
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  try {
    con.query(
      myquery,
      [
        req.body.maphong,
        date,
        req.body.dienchisocu,
        req.body.dienmoi,
        req.body.nuocchisocu,
        req.body.nuocmoi,
      ],
      function (err, result, fields) {
        if (err) {
          console.log(err.stack);
          return res.json({ mes: "Phòng này đã được ghi điện nước" });
        }

        return res.json({ mes: "đã tạo hóa đơn" });
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối đến điện nước thất bại");
  }
};
//Lây điện nước của 1 phòng
exports.layDN = (req, res, next) => {
  let myquery =
    `select maphong,
    date_format(thoigianghi,'%Y-%m-%d') as thoigianghi ,
    dienchisocu,
    dienchisomoi,
    nuocchisocu,
    nuocchisomoi  from dien_nuoc where maphong=? ;`;
  console.log(req.body);
    try {
    con.query(
      myquery,
      [req.params.maphong],
      function (err, result, fields) {
        if (err) throw err.stack;
        console.log(result);
        return res.send(result);
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối đến điện nước thất bại");
  }
};
// chỉnh sửa giá điện nước
exports.chinhsuaDN = (req, res, next) => {
  let myquery =
 "UPDATE `qlnhatro`.`dien_nuoc` SET `thoigianghi` =?,`dienchisocu` = ?,`dienchisomoi` = ?, `nuocchisocu` = ?, `nuocchisomoi` = ? WHERE (`maphong` = ?) and (`thoigianghi` = ?);";
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  try {
    con.query(
      myquery,
      [
        date,
        req.body.dienchisocu,
        req.body.dienmoi,
        req.body.nuocchisocu,
        req.body.nuocmoi,
        req.body.maphong,
        req.body.thoigianghi,
      ],
      function (err, result, fields) {
        if (err) throw err.stack;
        return res.send("Cập nhật thành công");
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối đến điện nước thất bại");
  }
};
//Xóa điện nước của 1 phòng

exports.xoaDN = (req, res, next) => {
  let myquery =
    "DELETE FROM `qlnhatro`.`dien_nuoc` WHERE (`maphong` = ?) and (`thoigianghi` = ?);";

  try {
    con.query(
      myquery,
      [req.params.maphong, req.query.thoigianghi],
      function (err, result, fields) {
        if (err) throw err.stack;
        return res.send("xóa thành công");
      }
    );
  } catch (error) {
    return new ApiError(500, "Kết nối đến điện nước thất bại");
  }
};
//Thống kê điện nước tiêu thụ
exports.thongke =async (req, res, next) => {
  let myquery = `select month(thoigianghi) as thang,thoigianghi,
    sum(dienchisomoi)- sum(dienchisocu) as tongdientieuthu,
    sum(nuocchisomoi)- sum(nuocchisocu) as tongnuoctieuthu
    from dien_nuoc
    group by month(thoigianghi)
    having  year(thoigianghi)=? 
    order by thang desc
    limit 3;`;

  diennuoc = await con
    .promise()
    .query(myquery, req.params.nam)
    .then((data) => {
      return data[0];
    })
    .catch((err) => {
      return err;
    });
    res.send(diennuoc);
};
