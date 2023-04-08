const con = require("../util/mysql.util");
const ApiError = require("../api_error");

// Hiện danh sách loại phòng
exports.layDSLP = (req, res, next) => {
  let myquery = `select lp.maloai,tenloai,dientich,giaphong from loaiphong lp join gialoaiphong g on lp.maloai=g.maloai where lp.tontai='1' and g.tontai='1';`;
  try {
    con.query(myquery, function (err, results, fields) {
      return res.send(results);
    });
  } catch (err) {
    return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
};
exports.layLP = (req, res, next) => {
  let myquery = `select  dientich,lp.maloai,tenloai, g.giaphong from loaiphong lp join gialoaiphong g on lp.maloai=g.maloai where lp.maloai=?;`;
  try {
    con.query(myquery,req.params.maloai, function (err, results, fields) {
      return res.send(results[results.length-1]);
    });
  } catch (err) {
    return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
};
// Thêm 1 loại phòng
exports.themLP = (req, res, next) => {
  let themthoigian =
    "INSERT INTO `qlnhatro`.`thoigian` (`thoigianapdung`) VALUES (?);";
  let themloaiphong =
    "INSERT INTO `qlnhatro`.`loaiphong` (`tenloai`, `dientich`,`tontai`) VALUES (?, ?,'1');";
  let demsoloai = "select max(maloai) from loaiphong;";
  let themgia =
    "INSERT INTO `qlnhatro`.`gialoaiphong` (`thoigianapdung`, `maloai`, `giaphong`,`tontai`) VALUES (?, ?, ?,'1');";

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  var dateTime = date + " " + time;
  try {
    con.query(themthoigian, dateTime);
    con.query(themloaiphong, [req.body.tenloai, req.body.dientich]);
    let maloai;
    con.query(demsoloai, function (err, results, fields) {
      maloai = results[0];
      
      maloai = Object.values(maloai);
      con.query(themgia, [dateTime, maloai, req.body.giaphong]);
      return res.send("Thêm thành công");
    });
  } catch (err) {
    return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
};

// chỉnh sửa  loại phòng /:maloai
exports.capNhatLP = (req, res, next) => {
  let capnhatloaiphong =
    "UPDATE `qlnhatro`.`loaiphong` SET `dientich` =?,`tenloai` =? WHERE (`maloai` = ?);";
  let themthoigian =
      "INSERT INTO `qlnhatro`.`thoigian` (`thoigianapdung`) VALUES (?);";
  let capnhattontaigia=" UPDATE `qlnhatro`.`gialoaiphong` SET `tontai` = '0' WHERE`maloai` = ?;";
  let themgia =
      "INSERT INTO `qlnhatro`.`gialoaiphong` (`thoigianapdung`, `maloai`, `giaphong`,`tontai`) VALUES (?, ?, ?,'1');";

  var today = new Date();
  var date =
      today.getFullYear() +"-" +(today.getMonth() + 1) + "-" +today.getDate();
  var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  try {
      con.query(capnhatloaiphong, [req.body.dientich,req.body.tenloai,req.params.maloai]);
      if (req.body.giaphong) {
        con.query(themthoigian, dateTime);
        con.query(capnhattontaigia,req.params.maloai);
        con.query(themgia, [dateTime, req.params.maloai, req.body.giaphong]);
        }
      res.send("Cập nhật thành công");
  } catch (err) {
      return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
};
// xóa loại phòng :/maloai
exports.xoaLP = (req,res,next)=>{
  let ktsophongconlai="select count(*) from phong where maloai=? and trangthai='1';";
  let xoaloaiphong="UPDATE `qlnhatro`.`loaiphong` SET `tontai` = '0' WHERE (`maloai` = ?);";
  

  try {
    let conlai;
    con.query(ktsophongconlai,req.params.maloai,function(err,results){
      conlai=Object.values(results[0]);
      if(conlai==0){
        con.query(xoaloaiphong,req.params.maloai);
        return res.send("Xóa thành công");    
      }
      else{
        return res.send("Phòng trọ của loại phòng bạn muốn xóa vẫn còn người ở");
      }
    });
  }catch(error){
    return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
}
// Hiện ds phòng của 1 loại /:maloai
exports.layDSP= (req,res,next)=>{
  let laydsphong="select * from phong where maloai=?;";
  try{
    con.query(laydsphong,req.params.maloai,function(err,results){
      return res.json(results);
    });
  }catch(error){
    return next(new ApiError(500, "Xảy ra lỗi khi kết nối đến loại phòng"));
  }
}

