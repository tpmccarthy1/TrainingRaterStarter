const express = require('express');
require('./config/config');
const models = require('./models');
require('./global_functions');
const sessions = require('./controllers/SessionsController');
const users = require('./controllers/UsersController');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function(req, res, next){
    //website you will allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    //pass to next layer of middleware
    next();
})

app.get('/', (req, res) => { res.send('Hello World!!!')} );

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

//Sessions routes
app.get('/sessions', sessions.getAll); //get all sessions
app.get('/sessions/:sessionId', sessions.get); //get specific session
app.post('/sessions', sessions.create); //create new session
app.put('/sessions', sessions.update); //update existing session

//Users routes
app.get('/users', users.getAll); //Get all users
app.get('/users/:userId', users.get); //Get single user
app.post('/users', users.create); //Create a new user
app.put('/users', users.update); //Update a user

module.exports = app;