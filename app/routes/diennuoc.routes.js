const { Router } = require('express');
const express= require('express');
const router= express.Router();
const dien_nuoc=require('../controllers/diennuoc.controller');

router.route('/')
    .get(dien_nuoc.layDSDN)
    .post(dien_nuoc.themDN);

router.route('/:maphong')
        .get(dien_nuoc.layDN)
        .put(dien_nuoc.chinhsuaDN)
        .delete(dien_nuoc.xoaDN);
module.exports=router;