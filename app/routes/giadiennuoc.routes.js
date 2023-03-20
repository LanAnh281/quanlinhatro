const express=require('express');
const router= express.Router();
const dien_nuoc= require('../controllers/giadiennuoc.controller');

router.route('/')
        .get(dien_nuoc.layTT)
        .post(dien_nuoc.themTT);

module.exports=router;