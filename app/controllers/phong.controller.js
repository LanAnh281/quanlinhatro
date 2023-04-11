const con= require('../util/mysql.util');
const ApiError=require('../api_error');

exports.layTTP= (req,res,next)=>{
    let myquery="select * from phong";
    try {
        con.query(myquery,function(err,result, field){
            if(err) throw err.stack;
            return res.send(result);
        })
    } catch (error) {
        return new ApiError(500,'Không kết nối với phong');
    }
}
//Hiển thị dsp theo loại
exports.LTTPTheoLoai=(req,res,next)=>{
    let myquery="select * from phong where maloai=?;";
    try{
        con.query(myquery,req.params.maloai,function(err,result,field){
            if(err) throw err.stack;
            res.send(result);
        })
    }catch(err){
        return new ApiError(500,'Không kết nối với phòng');
    }
}
//Thêm mới giá điện nước
exports.themTT= (req,res,next)=>{
    let myquery="INSERT INTO `qlnhatro`.`phong` (`maloai`, `tenphong`, `trangthai`) VALUES (?, ?, '0');";
    try {
        con.query(myquery,
            [req.query.maloai,req.body.tenphong],
            function(err,result, field){
            if(err) throw err.stack;
            return res.send('Thêm phòng thành công');
        })
    } catch (error) {
        return new ApiError(500,'Không kết nối với phòng');
    }

}
//Chỉnh sửa trạng thái phòng
exports.chinhsuaPhong= (req,res,next)=>{
    console.log(req.body.trangthai);
    let myquery="   UPDATE `qlnhatro`.`phong` SET `trangthai` = ? WHERE (`maphong` = ?);";
    try {
        con.query(myquery,
            [req.body.trangthai,req.params.maphong],
            function(err,result, field){
            if(err) throw err.stack;
            return res.send('Chỉnh sửa trạng thái phòng thành công');
        })
    } catch (error) {
        return new ApiError(500,'Không kết nối với phòng');
    }

}