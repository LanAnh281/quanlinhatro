const express = require('express');
const taikhoan= require('../controllers/khachtro.controller');
const router= express.Router();

router.route('/')
            .get(taikhoan.layTK)
            .post(taikhoan.taoTK);
router.route('/:sotk')
            .get(taikhoan.lay1TK)
            .put(taikhoan.chinhsuaTK);
            
            
module.exports=router;