const express =require('express');
const router=express.Router();
const hopdong=require('../controllers/hopdong.controller');
const login=require('../controllers/login.controller');
router.route('/')
        .get(hopdong.layDSHD)
        .post(hopdong.themHD);
router.route('/:sotk')
        .get(hopdong.layHD);
router.route('/:mahd')
        .delete(hopdong.xoaHD);


module.exports=router;