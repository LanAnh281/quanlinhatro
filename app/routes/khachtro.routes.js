const express = require('express');
const taikhoan= require('../controllers/khachtro.controller');
const router= express.Router();
const login= require('../controllers/login.controller');
const uploadController= require('../controllers/upload.controller');
const upload = require('../controllers/uploadMiddleware');
router.route('/')
            .get(taikhoan.layTK)
            .post([upload.single('anhcccd'),uploadController.uploadImg,taikhoan.taoTK]);

router.route('/khach')
            .get([login.KTDN,taikhoan.layKT]);

            
router.route('/khonganh/:sotk')
.put(taikhoan.chinhsuaKhongAnhTK);
router.route('/:sotk')
            .get(taikhoan.lay1TK)
            .put([upload.single('anhcccd'),uploadController.uploadImg,taikhoan.chinhsuaTK])
            .delete(taikhoan.xoaTK);


router.route('/timkiem')
    .post(taikhoan.timkiem);            
module.exports=router;