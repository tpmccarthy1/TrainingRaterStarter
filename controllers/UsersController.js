const Users = require('../models').Users;
const validator = require('validator');

//Get all users
  const getAll = async function ( req, res ) {
    res.setHeader('Content-Type', 'application/json');
    let whereStatement = {};
    if (req.query.userName) {
        whereStatement.Statement.userName = {
            $like: '%' + req.query.userName + '%'
        };
    }
    
    [err, users] = await to(Users.findAll({ where: whereStatement}));

    return ReS(res, users, 200);
}

module.exports.getAll = getAll;

//Get a single user 
  const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let userId = parseInt(req.params.userId);

    let err, user;
    [err, user] = await to(Users.findById(userId));
    if (!user) {
      ReE(res, err, 404);
    }
    //Success
    return ReS(res, user, 200);
  }

module.exports.get = get;

//Update a user
  const update = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const data = req.body;
    
    let err, user;
    [err, user] = await to(Users.update(data, {
      where: {
        id: data.id
      }
    }));
    
    if (err) {
      return ReE(res, err, 422);
    }
    // Success
    return ReS(res, user, 200);
  }
  
  module.exports.update = update;
  
// Create 
  const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

   // Validate that an email and password has been provided 
    if (!body.email){
      return ReE(res, 'Please enter an email.', 422);
    } else if (!body.password) {
      return ReE(res, 'Please enter a password.', 422);
    } else {
      let err, user;

      [err, user] = await to(createUser(body));
      if(err) {
        console.log(err);
        return ReE(res, err, 422);
      } 
      // Success
      return ReS(res, user, 201);
    }
  }

  module.exports.create = create;

  // Function to create new user and save to db
  const createUser = async function (userInfo) {
    let err;
    if (validator.isEmail(userInfo.email)) {
      [err, user] = await to(Users.create(userInfo));
      if (err) TE('Email already exists.');
      return user;
    } else {
      TE('Email is invalid');
    }
  }
  module.exports.createUser = createUser;


  // Log in function
  const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authUser(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, { token: user.getJWT(), user: user.toJSON() });
  }
  
  module.exports.login = login;

  // Authorize user function
  const authUser = async function (userInfo){
    if (!userInfo.email) TE('Please enter an emai, to login');

    if (!userInfo.password) TE('Please enter a password to login');

    let user;
    if(validator.isEmail(userInfo.email)){

      [err, user] = await to(Users.findOne({ where: { email: userInfo.email } }));
      if (err) TE(err.message);
    } else {
      TE('A valid email was not entered');
    }

    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

  }

  module.exports.authUser = authUser;

  // Delete user function
  const deleteUser = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let userId = parseInt(req.params.userId);

    let err, user;
    [err, user] = await to(Users.destroy({ where: { id: userId } }));
 
    if (err) {
      return ReE(res, err, 422);
    }
    
    // Success
    return ReS(res, user, 200);
  }

  module.exports.deleteUser = deleteUser;


