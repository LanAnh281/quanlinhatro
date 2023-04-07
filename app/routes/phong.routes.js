const express = require('express');
const phong= require('../controllers/phong.controller');
const router= express.Router();

router.route('/')
        .get(phong.layTTP)
        .post(phong.themTT);
router.route('/:maphong')
        .put(phong.chinhsuaPhong);
router.route('/:maloai')
.get(phong.LTTPTheoLoai);
module.exports=router;