const con=require('../util/mysql.util');
const ApiError=require('../api_error');

exports.dskhachtro =(req,res,next)=>{
    let kq=[];
    let myquery=`call hiends(?)`;
    let dieukien=req.params.tends;
    // let tenquery=Object.values(req.query);
    // console.log(tenquery);
    try{
        kq= con.query(
            myquery,dieukien,
            function(err, results, fields) {
              console.log(results[0]); // results contains rows returned by server
              res.send(results[0]);
            }
          );
    }
    catch(error){
        return next(
            new ApiError( 500, "An error occurred while creating the contact")
        );
    }
   
};
exports.taotaikhoan =(req,res,next)=>{
    let kq=[];
    let myquery=`select newTK()`;
    
    try{
        kq= con.query(
            myquery,
            function(err, results, fields) {
              console.log(results); 
              res.send(results);
            }
          );
    }
    catch(error){
        return next(
            new ApiError( 500, "An error occurred while creating the contact")
        );
    }
    
};


exports.hiendscodieukien =(req,res,next)=>{
    let kq=[];
    let myquery=`call hiends2(?)`;
    let dieukien=req.params.tends;
    let tenquery=Object.values(req.query);
    console.log(tenquery);
    try{
        kq= con.query(
            myquery,dieukien,tenquery,
            function(err, results, fields) {
              console.log(results[0]); // results contains rows returned by server
              res.send(results[0]);
            }
          );
    }
    catch(error){
        return next(
            new ApiError( 500, "An error occurred while creating the contact")
        );
    }
   
};
