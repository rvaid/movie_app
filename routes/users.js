var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  // console.log("authenticated")
  // res.send(req.user["token"])
  userModel.findOrCreateUser(req.user["profile"],function(err){
    if(err != null){
      res.render('user', { user: req.user });
    }

  })
  
});


router.post('/like', ensureAuthenticated, function(req, res, next){
  console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  userModel.likeOrDislikeMovie(req.user["profile"], req.body, function(err){
    console.log(err)
    if(err != null){
      res.send("1")
    }
    else{res.send("-1")}
  })

})

router.get('/profile', ensureAuthenticated, function(req, res, next){
  userModel.getUserProfile(req.user["profile"], function(output){
      res.send(JSON.stringify(output))
  })

})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}



module.exports = router;
