const express =require('express');
const router =express.Router();
const taikhoan=require('../controllers/taikhoan.controller');
const login=require('../controllers/login.controller');
router.route('/')
        .get(taikhoan.layDSTK)
        .put([login.KTDN,taikhoan.capnhatMK]);
       
router.route('/:sotk/:quyen')
        .put(taikhoan.capnhatQuyen);       
router.route('/:sotk')
        .get(taikhoan.layTK)
        .delete(taikhoan.xoaTK);

 

module.exports=router;