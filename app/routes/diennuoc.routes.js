const { Router } = require('express');
const express= require('express');
const router= express.Router();
const dien_nuoc=require('../controllers/diennuoc.controller');

router.route('/')
    .get(dien_nuoc.layDSDN)
    .post(dien_nuoc.themDN)
    .put(dien_nuoc.chinhsuaDN);

router.route('/:maphong')
        .get(dien_nuoc.layDSDN)
        .post(dien_nuoc.layDN)
        .delete(dien_nuoc.xoaDN);
router.route('/thongke/:nam')
    .get(dien_nuoc.thongke);
module.exports=router;