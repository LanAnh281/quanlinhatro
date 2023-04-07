const express=require('express');
const loaiphong=require('../controllers/loaiphong.controller');

const router= express.Router();

router.route('/')
            .get(loaiphong.layDSLP)
            .post(loaiphong.themLP);
router.route('/:maloai')
            .get(loaiphong.layLP)
            .put(loaiphong.capNhatLP)
            .delete(loaiphong.xoaLP);
            // .get(loaiphong.layDSP);

router.route('giaphong')

module.exports=router;