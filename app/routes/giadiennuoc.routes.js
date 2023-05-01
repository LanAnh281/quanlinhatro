const express=require('express');
const router= express.Router();
const dien_nuoc= require('../controllers/giadiennuoc.controller');

router.route('/')
        .get(dien_nuoc.layTT)
        .post(dien_nuoc.themTT)
        .put(dien_nuoc.chinhsuaTT);

module.exports=router;