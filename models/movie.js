const tmdb = require('tmdbv3').init('05ac1be3f1fbe4c2e9545d6a10cc6b3d');

searchMovie = function(keyword, page, callback){
    tmdb.search.movie(keyword, page, function(err,res){
        console.log(res)
        callback(res)
    })
}

displayPopularMovies = function(page, callback){
    tmdb.misc.popular(page, function(err,res){
        console.log(res)
        callback(res)
    })
}

module.exports = {
    searchMovie : searchMovie,
    displayPopularMovies : displayPopularMovies
}
