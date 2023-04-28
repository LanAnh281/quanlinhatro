const express =require('express');
const router=express.Router();
const nhatro=require('../controllers/nhatro.controller');
const login =require('../controllers/login.controller');
router.route('/')
    .get(nhatro.layTTNT)
    .put([login.KTDN,nhatro.chinhsua]);   ;
    
// router.route('/:sotk')
//     .put(nhatro.chinhsua);   

module.exports=router;