const con=require('../util/mysql.util');
const ApiError =require('../api_error');

exports.layDSHD=(req,res,next)=>{
    let myquery='call hiends("hopdong")';
    try {
        con.query(myquery, function(err,result,fields){
            if(err) throw this.err;
            return res.send(result[0]);
        })
    } catch (error) {
        return new ApiError(500,'Kết nối thất bại đến hợp đồng');
    }
}