const express =require('express');
const router=express.Router();
const paypal=require('../controllers/paypal.controller');
router.route('/')
    .get(paypal.hien)
    .post(paypal.taopaypal);
router.route('/success')
.get(paypal.thanhcong);
router.route('/cancel')
.get(paypal.thatbai);

module.exports=router;
