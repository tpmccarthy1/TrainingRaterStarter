const express = require('express');
require('./config/config');
const models = require('./models');
require('./global_functions');
const bodyParser = require('body-parser');
const passport = require('passport');
const JWT = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('./models').Users;
const app = express();

// Use express router
const router = require('./routes');
app.use('/', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 
      'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established');
    })
    .catch(err => {
        console.error('Unable to connect to the databse:', err);
    });

if (CONFIG.app === 'dev'){
    models.sequelize.sync();
}

module.exports = app;

const PassportSetup = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JWT(opts, async function(jwt_payload, done) {
        let err, user;
        [err, user] = await to(Users.findById(jwt_payload.user_id));
        if(err) {
            return done(err, false);
        }
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }))
}


// add delete end points
// refactor sessions and Users
// make passport work