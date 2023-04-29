//router.js
const express = require('express');
const router = express.Router();
const uploadController= require('../controllers/upload.controller');
const upload = require('../controllers/uploadMiddleware');
router.route('/')
    .get(uploadController.hienthi)
    .post([upload.single('image1'),uploadController.uploadImg,uploadController.getImg]);
router.route('/:id')
    .get(uploadController.getImg);


module.exports = router;
