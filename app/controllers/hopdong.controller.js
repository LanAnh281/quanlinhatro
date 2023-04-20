const con = require("../util/mysql.util");
const ApiError = require("../api_error");
const jwt = require("jsonwebtoken");

exports.checkDN = async (req, res, next) => {
  req.cookies.token;
  var token = await req.cookies.token;
  console.log(token);
};

// Lấy ds hợp đồng
exports.layDSHD = (req, res, next) => {

  let myquery =   `select mahd,hd.maphong,p.tenphong,kh.STT,hoten, date_format(ngaybd,'%d-%m-%Y') as ngaybd,date_format(ngaykt,'%d-%m-%Y') as ngaykt
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
  console.log("mã tài khoản:",req.body.matk);
  let layTK = `select STT from taikhoan where matk=?;`;
  let themhd =`INSERT INTO hopdong (maphong, stt_tk, stt_tro, ngaybd, ngaykt) VALUES (?,?,?,?,?);`;
  let token = req.cookies.token;
  let kq = await jwt.verify(token, "password");
  console.log('tài khoản chủ :',kq.STT);
  taikhoanKhach = await con
    .promise()
    .query(layTK, req.body.matk)
    .then((data) => {
      return data[0];
    })
    .catch((err) => {
      return err;
    });
    console.log('tài khoản khách',taikhoanKhach);
  
  try {
    con.query(themhd,[req.body.maphong,taikhoanKhach[0].STT,kq.STT,req.body.ngaybd,req.body.ngaykt],function(err,results,field){
      console.log('thêm hợp đồng');
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
  let myquery = "select  maphong,stt_tro,stt_tk, mahd,date_format(ngaybd,'%Y-%m-%d')as ngaybd ,date_format(ngaykt,'%Y-%m-%d')  as ngaykt from hopdong where mahd=?;";
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