var pool = require('../MySQLConnectionManager/MySQLConnectionManager')

findOrCreateUser = function (user, callback) {
    console.log(user)
    let query = `INSERT INTO users (id)
        SELECT * FROM (SELECT ?) AS tmp
        WHERE NOT EXISTS (
            SELECT id FROM users WHERE id = ?
        )`
    var email;
    user["emails"].forEach(function (emailObj) {
        if (emailObj["type"] == "account") {
            email = emailObj["value"]
            pool.getConnection(function (err, connection) {
                connection.query(query, [email, email], function (err, rows) {
                    connection.release();
                    if (!err) {
                        console.log(rows)
                        callback("1")
                    }
                    else
                        callback(null)
                });

            })

        }
        callback(null)
    })
}


likeOrDislikeMovie = function (user, movieObj, callback) {
    movieObj = JSON.parse(req.body)
    movieObj = { "MovieName": "Kung Fu Panda", "hasLiked": "1" }
    let query = `INSERT INTO user_movies 
                SET user_id=?,MovieName=?,hasLiked=?
                ON DUPLICATE KEY UPDATE user_id=?,MovieName=?`

    let email;


    user["emails"].forEach(function (emailObj) {
        if (emailObj["type"] == "account") {
            email = emailObj["value"]
            pool.getConnection(function (err, connection) {
                connection.query(query, [email, movieObj["MovieName"], movieObj["hasLiked"], email, movieObj["MovieName"]], function (err, rows) {
                    connection.release();
                    if (!err) {
                        console.log(rows)
                        callback("1")
                    }
                    else { callback(null) }

                });

            })

        }

    })
}

getMovieDataFromDb = function (user, callback) {
    let query = `select * from user_movies where user_id=?`
    let email;
    let output
    let count = 0
    user["emails"].forEach(function (emailObj) {
        
        console.log("Huuu")
        if (emailObj["type"] == "account") {
            email = emailObj["value"]
            pool.getConnection(function (err, connection) {
                connection.query(query, [email], function (err, rows) {
                    console.log(rows)
                    connection.release();
                    if (!err) {
                        output = [];
                        if(! rows){callback(output)}
                        rows.forEach(function (value) {
                            count++;
                            console.log(value)
                            var existing = output.filter(function (v, i) {
                                return v["hasLiked"] == value["hasLiked"];
                            });
                            if (existing.length) {
                                var existingIndex = output.indexOf(existing[0]);
                                output[existingIndex]["MovieName"] = output[existingIndex]["MovieName"].concat(value["MovieName"]);
                               
                            } else {
                                if (typeof value["MovieName"] == 'string')
                                    value["MovieName"] = [value["MovieName"]];
                                output.push(value);
                                
                            }
                            if(count == rows.length){
                                console.log(count)
                                callback(output)
                            }
                            
                            
                        });
                        
                    }
                    else { callback(null) }

                });

            })

        }
    })


}

getUserProfile = function (user, callback) {
    console.log("Hello")
    let count = 0 
    let userProfile = {}
    userProfile["displayName"] = user["displayName"]
    userProfile["profilePicUrl"] = user["photos"][0]["value"]
    getMovieDataFromDb(user, function(output){
        console.log(output)
        output.forEach(function(row){
            row["displayName"] = user["displayName"]
            row["profilePicUrl"] = user["photos"][0]["value"]
            count++;
            if(count == output.length ){
                callback(output)
            }
        })
       
    })






}


module.exports = {
    findOrCreateUser: findOrCreateUser
    , likeOrDislikeMovie: likeOrDislikeMovie
    , getUserProfile: getUserProfile

}





