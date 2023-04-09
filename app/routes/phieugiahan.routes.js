const express = require('express');
const router= express.Router();
const phieugiahan= require('../controllers/phieugiahan.controller');

router.route('/')
        .get(phieugiahan.layDS)
        .put(phieugiahan.chinhsua)
        .delete(phieugiahan.xoaPhieu);
        
router.route('/:sotk')
        .get(phieugiahan.layDSPhieu)
        .post(phieugiahan.taophieu);

        
        
module.exports=router;