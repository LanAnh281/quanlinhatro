const express = require('express');
const phong= require('../controllers/phong.controller');
const router= express.Router();

router.route('/')
        .get(phong.layTTP);
router.route('/:maloai')
        .post(phong.themTT);
router.route('/:maphong')
        .get(phong.layPhong)
        .put(phong.chinhsuaPhong)
        .delete(phong.xoaPhong);
router.route('/dsphong/:maloai')
.get(phong.LTTPTheoLoai);
module.exports=router;