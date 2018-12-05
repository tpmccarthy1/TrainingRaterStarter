const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Sessions & Users controllers
const SessionsController = require('../controllers/SessionsController');
const UsersController = require('../controllers/UsersController');

// Session Routes

// Function to authenticate user
const auth = function(){
    return passport.authenticate('jwt', { session : false });
}; 

// Get all sessions
router.get('/sessions', auth(), SessionsController.getAll); 

// Get specific session
router.get('/sessions/:sessionId', auth(), SessionsController.get); 

// Create new session
router.post('/sessions', auth(), SessionsController.create); 

// Update existing session
router.put('/sessions', auth(), SessionsController.update); 

// Delete session
router.delete('/sessions/:sessionId', auth(), SessionsController.deleteSession);


// User Routes

// Get all users
router.get('/users', UsersController.getAll); 

// Get single user
router.get('/users/:userId', UsersController.get);

// Create a new user
router.post('/users',  UsersController.create); 

// Update a user
router.put('/users', UsersController.update); 

// Delete a user
router.delete('/users/:userId', UsersController.deleteUser);


// Auth routes

//Log in
router.post('/login',  UsersController.login); 

// Export as module
module.exports = router;