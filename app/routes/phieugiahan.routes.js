const express = require('express');
const router= express.Router();
const phieugiahan= require('../controllers/phieugiahan.controller');
const login = require('../controllers/login.controller');
router.route('/')
        .get(phieugiahan.layDS)
        .put(phieugiahan.chinhsua);
router.route('/:maphieu')
        .delete(phieugiahan.xoaPhieu);
        
router.route('/giahan/khach')
        .get([login.KTDN,phieugiahan.layDSPhieu])
        .post([login.KTDN,phieugiahan.taophieu])
        

        
        
module.exports=router;