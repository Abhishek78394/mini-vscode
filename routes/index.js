var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  let fread = path.join(__dirname, "..", "public", "uploads")
  let filename = fs.readdirSync(fread);
  res.render('index',{filename , filedata:"" , activefile:""});
});

/* GET /file/:filename */
router.get('/file/:filename', function(req, res, next) {
  let fread = path.join(__dirname, "..", "public", "uploads")
  let filename = fs.readdirSync(fread);
  let dread = path.join(__dirname, "..", "public", "uploads", req.params.filename)
  let filedata = fs.readFileSync(dread,"utf-8");
  res.render('index',{filename , filedata , activefile:req.params.filename});
});

/* POST /create page. */
router.post('/create', function(req, res, next) {
let x= path.join(__dirname,"..","public","uploads",req.body.file)
fs.writeFileSync(x, "");
let fread = path.join(__dirname, "..", "public", "uploads")
let filename = fs.readdirSync(fread);
  res.render('index' ,{filename ,filedata:"", activefile:""});
});

/* GET svae /:filename*/
router.post('/save/:filename', function(req, res, next) {
  let fread = path.join(__dirname, "..", "public", "uploads")
  let filename = fs.readdirSync(fread);
  let fupdate = path.join(__dirname, "..", "public", "uploads", req.params.filename);
  fs.writeFileSync(fupdate, req.body.filedata );
  let filedata = fs.readFileSync(fupdate,"utf-8");
  res.render('index',{filename , filedata, activefile:req.params.filename});
});

/* GET /delete/:filename*/
router.get('/delete/:filename', function(req, res, next) {
  let fdelete = path.join(__dirname, "..", "public", "uploads", req.params.filename);
  fs.unlinkSync(fdelete);
  res.redirect("/")
});


module.exports = router;

