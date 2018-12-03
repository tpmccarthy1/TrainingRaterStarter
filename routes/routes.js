const express = require('express');
const router = express.Router();
const passport = require('passport');

// Function to authenticate user
const auth = function(){
    return passport.authenticate('jwt', { session : false });
};


// Bring in Sessions controller
const SessionsController = require('../controllers/SessionsController');

// Get all sessions
router.get('/sessions',  SessionsController.getAll); 

// Get specific session
router.get('/sessions/:sessionId', SessionsController.get); 

// Create new session
router.post('/sessions', SessionsController.create); 

// Update existing session
router.put('/sessions', SessionsController.update); 

// Delete session
router.delete('/sessions/:sessionId', SessionsController.deleteSession);


// Bring in Users controller
const UsersController = require('../controllers/UsersController');

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


// Export as module
module.exports = router;