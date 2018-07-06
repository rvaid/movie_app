var express = require('express');
var router = express.Router();
var movieModel = require('../models/movie')

router.get('/popular/:page', ensureAuthenticated, function(req, res, next){
    console.log(req.params.page)
    movieModel.displayPopularMovies(Number(req.params.page), function(data){
        res.send(JSON.stringify(data))
    })
  
  })

router.post('/search/:page', ensureAuthenticated, function(req, res, next){
    movieModel.searchMovie(req.body["keyword"], Number(req.params.page), function(data){
        res.send(JSON.stringify(data))
    })
  })


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/auth/login')
  }

  module.exports = router