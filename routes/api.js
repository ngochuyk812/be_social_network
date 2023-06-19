const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { isAuth } = require("../middleware/auth");


router.get('/test',  (req,res)=>{
  console.log(req.user);
  res.send(req.user)
})

 module.exports = router;
