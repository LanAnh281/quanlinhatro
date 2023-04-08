const express= require('express');
const router=express.Router();
const login=require('../controllers/login.controller');

router.route('/')
    // .get(login.hienthi)
    .get([login.KTDN,login.checkQuyen])
    .post(login.dangnhap);
// router.route('/private')

module.exports=router;