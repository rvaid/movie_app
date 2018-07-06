var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var User = require('../models/User');
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
    return done(null, {
      profile: profile,
      token: accessToken
  });
  }
));

module.exports = passport;