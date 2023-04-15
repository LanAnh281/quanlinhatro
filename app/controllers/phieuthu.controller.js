const ApiError = require("../api_error");
const con = require("../util/mysql.util");

//Lấy  DSPT

exports.layDSPT = (req, res, next) => {
  let DSPT = "select * from phieuthu;";
  let DSPTThang = "select * from phieuthu where month(ngaythu)=?;";
  let DSPTNam="select * from phieuthu where year(ngaythu)=?;";
  

  try {
    if (req.query.thang) {
      con.query(DSPTThang, req.query.thang, function (err, result, fields) {
        return res.send(result);
      });
    }
    else if(req.query.nam){
        con.query(DSPTNam, req.query.nam, function (err, result, fields) {
            return res.send(result);
          });
    }
     else {
      con.query(DSPT, (err, result, fields) => {
        if (err) throw err.stack;
        return res.send(result);
      });
    }
  } catch (error) {
    return new ApiError(500, "Không kết nối với phiếu thu");
  }
};

//lây 1 phiếu thu của 1 hóa đơn
exports.layPT=(req,res,next)=>{
  let myquery=`select mahd,mapt, date_format(ngaythu,'%d-%m-%Y') as ngaythu from phieuthu where mahd=?;`;
  try {
    con.query(myquery,req.params.mahd, function (err,result,field) {
      if(err) throw err.stack;
      res.send(result);
      })
  } catch (error) {
    return new ApiError(500, "Không kết nối với hóa đơn");

  }
}
//tạo phiếu thu, phong
exports.taoPT = (req, res, next) => {
  let myquery = "INSERT INTO `qlnhatro`.`phieuthu` (`mahd`, `ngaythu`) VALUES (?, ?);";
  var today=new Date();
  var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  try {
    con.query(myquery, [req.params.mahd,date], (err, result, fields) => {
      if (err) throw err.stack;
      return res.send('tao thanh cong phieu thu');
    });
  } catch (error) {
    return new ApiError(500, "Không kết nối với phiếu thu");
  }
};
//xóa phiếu thu
exports.xoaPT = (req, res, next) => {
  let myquery = "DELETE FROM `qlnhatro`.`phieuthu` WHERE (`mapt` = ?);";
  try {
    con.query(myquery, req.query.mapt, (err, result, fields) => {
      if (err) throw err.stack;
      return res.send('xoas phieu thu thanh cong');
    });
  } catch (error) {
    return new ApiError(500, "Không kết nối với phiếu thu");
  }
};
//chỉnh sửa phiếu thu
exports.chinhsuaPT = (req, res, next) => {
  let myquery = "UPDATE `qlnhatro`.`phieuthu` SET `mahd` = ?, `ngaythu` = ? WHERE (`mapt` = ?);";
  var today=new Date();
  var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  try {
    con.query(myquery, [req.body.mahd,date,req.params.mapt], (err, result, fields) => {
      if (err) throw err.stack;
      return res.send("chinh sua thanh cong");
    });
  } catch (error) {
    return new ApiError(500, "Không kết nối với phiếu thu");
  }
};
