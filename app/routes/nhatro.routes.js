const express =require('express');
const router=express.Router();
const nhatro=require('../controllers/nhatro.controller');
router.route('/')
    .get(nhatro.layTTNT);
    
router.route('/:sotk')
    .put(nhatro.chinhsua);   

module.exports=router;