const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require("dotenv")
const globalLogger = require("../loggers/globalLogger")


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, async function(token, done) {
    try{
        // console.log(token.user)
        globalLogger.info(token.user)
        return done(null, token.user)
    }catch(ex){
        done(error)
    }
}));