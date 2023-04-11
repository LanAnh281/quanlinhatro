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
    console.log('tài khoản khách',taikhoanKhach[0].STT);
  
  try {
    con.query(themhd,[req.body.maphong,taikhoanKhach[0].STT,kq.STT,req.body.ngaybd,req.body.ngaykt],function(err,results,field){
      console.log('thêm hợp đồng');
      res.json({message:"thêm hợp đồng"});
    })
  } catch (error) {
    return new ApiError(500,'Không kết nối đến hợp đồng');
  }


};
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
  let myquery = "select * from hopdong where stt_tk=?";
  try {
    con.query(myquery, req.params.sotk, (err, result, fields) => {
      if (err) throw err.stack;
      return res.send(result);
    });
  } catch (error) {
    return new ApiError(500, "Kết nối thất bại đến hợp đồng");
  }
};
