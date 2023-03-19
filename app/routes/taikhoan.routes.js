const express =require('express');
const router =express.Router();
const taikhoan=require('../controllers/taikhoan.controller');
router.route('/')
        .get(taikhoan.layDSTK);
       
router.route('/:sotk/:quyen')
        .put(taikhoan.capnhatQuyen);       
router.route('/:sotk')
        .get(taikhoan.layTK)
        .put(taikhoan.capnhatMK)
        .delete(taikhoan.xoaTK);

 

module.exports=router;