const con = require("../util/mysql.util");
const ApiError = require("../api_error");
const jwt = require("jsonwebtoken");
const path = require("path");
exports.hienthi = (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../../views/", "index.html"));
};
exports.KTDN = async (req, res, next) => {
  let token = req.cookies.token;
  var TTTK;
  try {
    let kq = jwt.verify(token, "password");
    if (kq) {
      TTTK = await
        con
          .promise()
          .query("select * from taikhoan where STT=?;", kq.STT)
          .then((data) => {
            return data[0];
          })
          .catch((err) => {
            return err;
          });
    }
  } catch (err) {
    return res.redirect("/api/login");
  }
  req.data=Object(TTTK[0]);
  next();
};
exports.dangnhap = (req, res, next) => {
  let checkdangnhap =
    "select STT from taikhoan where matk=? and matkhau=md5(?);";
  try {
    con.query(
      checkdangnhap,
      [req.body.matk, req.body.matkhau],
      (err, result, field) => {
        if (err) throw err.stack;
        else if (result.length > 0) {
          kq = Object(result[0]);
          jwt.sign(result[0], "password", function (err, data) {
            return res.json({
              message: "success",
              token: data,
            });
          });
        } else {
          res.json({
            message:"fail"
          })
        }
      }
    );
  } catch (error) {
    return new ApiError(500, "đăng nhập lỗi");
  }
};





exports.checkChuTro=(req,res,next)=>{
  
  if(req.data.quyen==='1'){
    next();
  }else{
    res.json('Khong co quyen');
  }
}
exports.checkKhach=(req,res,next)=>{
  
  if(req.data.quyen==='0'){
    next();
  }else{
    res.json('Khong co quyen');
  }
}
exports.trangbatbuocDaDN = (req, res, next) => {
  console.log(req.data);
  res.json("welcome you to private page");
};




