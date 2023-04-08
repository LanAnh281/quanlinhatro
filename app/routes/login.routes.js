const express= require('express');
const router=express.Router();
const login=require('../controllers/login.controller');

router.route('/')
    // .get(login.hienthi)
    .post(login.dangnhap);
router.route('/private')
    .get([login.KTDN,login.checkChuTro,login.trangbatbuocDaDN]);

module.exports=router;