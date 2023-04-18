const con= require('../util/mysql.util');
const ApiError= require('../api_error');

//Lấy thông tin giá điện
exports.layDSDN=(req,res,next)=>{
    let myquery="select * from dien_nuoc";
    try {
        con.query(myquery,
            function(err,result,fields){
                if(err) throw err.stack;
                return res.send(result);
            })
        
    } catch (error) {
        return new ApiError(500,"Kết nối đến điện nước thất bại");
    }
}

// Thêm giá điện nước
exports.themDN=(req,res,next)=>{
    let myquery="INSERT INTO `qlnhatro`.`dien_nuoc` (`maphong`, `thoigianghi`, `dienchisocu`, `dienchisomoi`, `nuocchisocu`, `nuocchisomoi`) VALUES (?, ?, ?, ?, ?, ?);";
    var today = new Date();
    var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    
    try {
        con.query(myquery,
            [req.body.maphong, 
            date,
            req.body.dienchisocu,
            req.body.dienmoi,
            req.body.nuocchisocu,
            req.body.nuocmoi],
            function(err,result,fields){
                if(err) {
                    console.log(err.stack);
                    return res.json({mes:'Phòng này đã được ghi điện nước'});
                }  

                return res.json({mes:'đã tạo hóa đơn'});
            })
        
    } catch (error) {
        return new ApiError(500,"Kết nối đến điện nước thất bại");
    }
}
//Lây điện nước của 1 phòng
exports.layDN=(req,res,next)=>{
    let myquery="select * from dien_nuoc where maphong=? and month(thoigianghi)=? and year(thoigianghi)=?;";
    try {
        con.query(myquery,[req.params.maphong,req.body.thang,req.body.nam],
            function(err,result,fields){
                if(err) throw err.stack;
                return res.send(result);
            })
        
    } catch (error) {
        return new ApiError(500,"Kết nối đến điện nước thất bại");
    }
}
// chỉnh sửa giá điện nước
exports.chinhsuaDN=(req,res,next)=>{
    let myquery=
    `UPDATE dien_nuoc SET thoigianghi=?,dienchisocu = ?,dienchisomoi = ?, nuocchisocu = ?,nuocchisomoi = ? WHERE (maphong = ?) and (month(thoigianghi))=? and (year(thoigianghi))=?;`;
    var today = new Date();
    var date =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    
    try {
        con.query(myquery,
            [date,
            req.body.dienchisocu, 
            req.body.dienmoi,
            req.body.nuocchisocu,
            req.body.nuocmoi,
            req.body.maphong,
            req.body.thang,
            req.body.nam
            ],
            function(err,result,fields){
                if(err) throw err.stack;
                return res.send('Cập nhật thành công');
            })
        
    } catch (error) {
        return new ApiError(500,"Kết nối đến điện nước thất bại");
    }
}
//Xóa điện nước của 1 phòng

exports.xoaDN=(req,res,next)=>{
    let myquery="DELETE FROM `qlnhatro`.`dien_nuoc` WHERE (`maphong` = ?) and (`thoigianghi` = ?);";
    
    try {
        con.query(myquery,
            [
            req.params.maphong,
            req.query.thoigianghi
            ],
            function(err,result,fields){
                if(err) throw err.stack;
                return res.send('xóa thành công');
            })
        
    } catch (error) {
        return new ApiError(500,"Kết nối đến điện nước thất bại");
    }
}