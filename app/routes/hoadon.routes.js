const express= require('express');
const router= express.Router();
const hoadon= require('../controllers/hoadon.controller');

router.route('/')
        .get(hoadon.layDSHD)
        .post(hoadon.taoHD)
        .delete(hoadon.xoaHD);
router.route('/:mahd')
        .get(hoadon.layHD)  
        .put(hoadon.chinhsuaHDTheoKHTheoThang)
        .delete(hoadon.xoaHD);
        

module.exports=router;