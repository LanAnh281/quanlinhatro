const express =require('express');
const router=express.Router();
const hopdong=require('../controllers/hopdong.controller');

router.route('/')
        .get(hopdong.layDSHD)
        .post(hopdong.themHD);


module.exports=router;