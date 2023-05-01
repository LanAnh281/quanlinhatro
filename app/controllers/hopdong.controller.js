const con = require("../util/mysql.util");
const ApiError = require("../api_error");
const jwt = require("jsonwebtoken");

exports.checkDN = async (req, res, next) => {
  req.cookies.token;
  var token = await req.cookies.token;
  // console.log(token);
};

// Lấy ds hợp đồng
exports.layDSHD = (req, res, next) => {

  let myquery =   `select mahd,hd.maphong,p.tenphong,kh.STT,hoten, 

  date_format(ngaylap,'%d-%m-%Y') as ngaylap,
  date_format(ngaybd,'%d-%m-%Y') as ngaybd,
  date_format(ngaykt,'%d-%m-%Y') as ngaykt, 
  month(ngaykt) as thangkt,day(ngaykt) as ngaykthuc  
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
exports.themHD = async (req, res, next) => {
  let layTK = `select STT from taikhoan where matk=?;`;
  let themhd =`INSERT INTO hopdong (maphong, stt_tk, stt_tro, ngaybd, ngaykt,ngaylap) VALUES (?,?,?,?,?,?);`;

  var today=new Date();
  var ngaylap =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();


  let token = req.cookies.token;
  let kq = await jwt.verify(token, "password");
  taikhoanKhach = await con
    .promise()
    .query(layTK, req.body.matk)
    .then((data) => {
      return data[0];
    })
    .catch((err) => {
      return err;
    });
  
  try {
    con.query(themhd,[req.body.maphong,taikhoanKhach[0].STT,kq.STT,req.body.ngaybd,req.body.ngaykt,ngaylap],function(err,results,field){
      res.json({message:"thêm hợp đồng"});
    })
  } catch (error) {
    return new ApiError(500,'Không kết nối đến hợp đồng');
  }
};
//xoa
exports.xoaHD=(req,res,next)=>{
  let myquery=`DELETE FROM hopdong WHERE (mahd = ?);`;
  try {
    con.query(myquery,req.params.mahd,(err,results,field)=>{
      if(err) throw err.stack;
      return res.json({message:'Xóa thành công'});
    })
  } catch (error) {
    return new ApiError(500,'Không kết nối với hợp đồng');
  }
}
//lấy 1 hợp đồng
exports.layHD = (req, res, next) => {
  let myquery = `select  mahd,maphong,tenphong,STT,hoten, 
  date_format(ngaylap,'%d-%m-%Y') as ngaylap
  date_format(ngaybd,'%Y-%m-%d')as ngaybd ,
  date_format(ngaykt,'%Y-%m-%d')  as ngaykt 
  from hopdong where mahd=?;`;
  try {
    con.query(myquery, req.params.mahd, (err, result, fields) => {
      if (err) throw err.stack;
      return res.send(Object(result));
    });
  } catch (error) {
    return new ApiError(500, "Kết nối thất bại đến hợp đồng");
  }
};
//chỉnh sửa
exports.chinhsuahd=(req,res,next)=>{

  let myquery="UPDATE `qlnhatro`.`hopdong` SET `maphong` = ?, `stt_tk` = ?, `ngaybd` = ?, `ngaykt` = ? WHERE (`mahd` = ?);";
  try {
    con.query(myquery,
      [req.body.maphong,
        req.body.stt,
        req.body.ngaybd,
        req.body.ngaykt,
        req.params.mahd],
      function (err,results,field) {
        if(err) throw err.stack;
        res.json({message:'Cập nhật hợp đồng'});
      })
  } catch (error) {
    return new ApiError (500,'không kết nối với hợp đống');
  }
}
//layhdtheokhach
exports.layhdtheokhach = (req, res, next) => {
  let myquery = ` select mahd,hd.maphong,p.tenphong,kh.STT,hoten,
  date_format(ngaylap,'%d-%m-%Y') as ngaylap,
  date_format(ngaykt,'%Y-%m-%d') as ngayktcgh,
  month(ngaykt) as thangkt,date(ngaykt) as ngaykthuc,  
  date_format(ngaybd,'%d-%m-%Y') as ngaybd,date_format(ngaykt,'%d-%m-%Y') as ngaykt, month(ngaykt) as thangkt  from hopdong hd join khachhang kh on hd.stt_tk =kh.stt
  join phong p on p.maphong=hd.maphong where hd.stt_tk=?;`;
  try {
    con.query(myquery, req.data.STT, (err, result, fields) => {
      if (err) throw err.stack;
      return res.send(Object(result[result.length-1]));
      /* sau này sẽ mở rộng 1 người thuê nhiều phòng */ 
    });
  } catch (error) {
    return new ApiError(500, "Kết nối thất bại đến hợp đồng");
  }
};
//chỉnh sửa hợp đồng khi khách xóa ng dùng
exports.chinhsuahdtheokhach=(req,res,next)=>{
  var today = new Date();
  today =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    (today.getDate()-1);
  let myquery="UPDATE `qlnhatro`.`hopdong` SET `ngaykt` = ? WHERE (`stt_tk` = ?);";
  try {
    con.query(myquery,
      [
        today,
        req.body.STT],
      function (err,results,field) {
        if(err) throw err.stack;
        res.json({message:'Cập nhật hợp đồng'});
      })
  } catch (error) {
    return new ApiError (500,'không kết nối với hợp đống');
  }
}