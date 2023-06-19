const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();
const {isAuth} = require('../middleware/auth');
const connect = require('../connect/connect')
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });


router.post('/login', userController.login)
// router.post('/forgot_password', userController.forgotPassword)
router.post('/register', userController.register)


// router.post('/upload_audio', isAuth ,upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), function (req, res) {
//   try {
//     let date = new Date()
//     let id = "LOCAL_"+ date.getTime()
//     console.log(req.files['image'][0]);
//     let title  = req.body.title || req.files['audio'][0].originalname 
//     let  img 
//     let newPath
//     if(req.files['image']){
//       img =req.files['image'][0].path
//       let filename = req.files['image'][0].filename;
//       filename += '.jpg';
//      newPath = `uploads/${filename}`;
//     fs.rename(img, newPath, function(err) {
//       if (err) throw err;
//     });

  
//     }else{
//       newPath ="https://play-lh.googleusercontent.com/iddZg-gnvcXNGqyvUNwjbBzPwjh4LkEIejO_OoTufI2wOq1mC5b8bNZryOfNnnCVmyKm"
  
//     }
//     let artistsNames  = req.body.artists || "Không tác giả"
//     connect.query('INSERT INTO  `audio` SET id = ?, title = ?, artistsNames = ?, thumbnailM = ?, path=?, username = ?', [id , title,artistsNames, "/"+ newPath, req.files['audio'][0].path, req.user.username], function (error, results, fields) {
//       if (error) throw error;
//       res.send(id)
//     });
  
//   } catch(error) {
//     res.status(400).send(error.message);
//   }
// });
// router.post('/delete_audio',isAuth, function(req, res) {
//   AudioLocal.getAudioById(req.body.id,(rs)=>{
//     console.log(rs);
//     connect.query('DELETE FROM `audio` WHERE id = ? and username = ?', [ req.body.id, req.user.username], function (error, results, fields) {
//       if (error) throw error;
//       var filePath = rs.path; 
//       fs.unlinkSync(filePath);
//       filePath = rs.thumbnailM; 

//       res.send(req.body.id)
//     });
//   })
  
// });
// const checkValidation = (req, res, next)=>{
//     console.log(req.files);
// }
  
module.exports = router;

