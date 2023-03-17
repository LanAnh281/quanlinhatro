const express=require('express');
const chutro=require('../controllers/chutro.controller');

const router= express.Router();

router.route("/taikhoan1")
    .get(chutro.taotaikhoan);
router.route("/:tends")
    .get(chutro.dskhachtro);


module.exports=router;