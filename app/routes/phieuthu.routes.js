const express= require('express');
const router= express.Router();
const phieuthu= require('../controllers/phieuthu.controller');

router.route('/')
    .get(phieuthu.layDSPT)
    .delete(phieuthu.xoaPT);
router.route('/:mahd')
        .get(phieuthu.layPT)
        .post(phieuthu.taoPT);
router.route('/:mapt')
        .put(phieuthu.chinhsuaPT);

module.exports=router;