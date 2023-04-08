const con = require("../util/mysql.util");
const ApiError = require("../api_error");

exports.checkDN=async(req,res,next)=>{
  req.cookies.token;
  var token=await req.cookies.token;
  console.log(token);
}

// Lấy ds hợp đồng
exports.layDSHD = (req, res, next) => {
  
  let myquery = 
  `  select mahd,hd.maphong,p.tenphong,kh.STT,hoten, date_format(ngaybd,'%d-%m-%Y') as ngaybd,date_format(ngaykt,'%d-%m-%Y') as ngaykt
  from hopdong hd join khachhang kh on hd.stt_tk =kh.stt
  join phong p on p.maphong=hd.maphong;`;
  try {
    con.query(myquery, function (err, result, fields) {
      if (err) throw err.stack;
      return res.send(result);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối thất bại đến hợp đồng");
  }
};
//Thêm hợp đồng mới
exports.themHD = (req, res, next) => {
  let themhd =
  "INSERT INTO `qlnhatro`.`hopdong` (`maphong`, `stt_tk`, `stt_tro`, `ngaybd`, `ngaykt`) VALUES (?, ?, ?, ?, ?);";
  
  try {
    con.query(
      themhd,
      [ req.body.maphong,
        req.query.sotk,
        req.query.tktro,
        req.body.ngaybd,
        req.body.ngaykt,
      ], function (err, result, fields) {
        if (err) throw err.stack;
        return res.send('Tạo thành công hợp đồng');
      }
     
    );
  } catch (error) {
    return new ApiError(500, "Kết nối thất bại đến hợp đồng");
  }
};
//lấy 1 hợp đồng
exports.layHD=(req,res,next)=>{
    let myquery= 'select * from hopdong where stt_tk=?';
    try {
        con.query(myquery,req.params.sotk,(err,result,fields)=>{
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Kết nối thất bại đến hợp đồng');
    }
}
