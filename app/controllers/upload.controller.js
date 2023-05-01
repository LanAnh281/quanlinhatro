const con= require('../util/mysql.util');
const ApiError=require('../api_error');
const express = require('express');
const app = express();
const Resize = require('./Resize');
const upload = require('./uploadMiddleware');

const path = require('path');

exports.hienthi=async function (req, res,next) {
    await res.render('index');
};
exports.uploadImg =async function (req, res,next) {
    // console.log("file",req.file);
    // folder upload
    const imagePath = path.join('NienLuan','..', '/public/images');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    // console.log("file upload :",filename)
    req.data={ name: filename };
    // console.log("tên file",req.data.name);
    next();
    // return res.status(200).json({ name: filename });
}
exports.getImg= async function (req, res) {
    // folder upload
    // console.log("req.data.name:",req.data.name);
    
    const imagePath = path.join(__dirname,'..','..' ,'/public/images',`${req.params.id}`);
    // console.log(imagePath);
    res.sendFile(imagePath);
 
}
