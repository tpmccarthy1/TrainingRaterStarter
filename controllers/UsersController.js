const Users = require('../models').Users;

//Get all users
const getAll = async function ( req, res ) {
    res.setHeader('Content-Type', 'application/json');
    let err, users;

    let whereStatement = {};
    if (req.query.userName) {
        whereStatement.Statement.userName = {
            $like: '%' + req.query.userName + '%'
        };
    }

    [err, users] = await to(Users.findAll({ where: whereStatement}));

    return res.json(users);
}

module.exports.getAll = getAll;

//Get a single user 
const get = async function (req, res) {
    
    let err, user;
    let userId = parseInt(req.params.userId)
    res.setHeader('Content-Type', 'application/json');
  
    [err, user] = await to(Users.findById(userId))
    if (!user) {
      res.statusCode = 404;
      return res.json({ success: false, error: err });
    }
    return res.json(user);
  }

module.exports.get = get;

//Update a  user
const update = async function (req, res) {
    let err, user, data;
    data = req.body;
  
    [err, user] = await to(Users.update(data, {
      where: {
        id: data.id
      }
    }));
    if (err) {
      if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
      }
  
      if (typeof code !== 'undefined') res.statusCode = code;
      res.statusCode = 422
      return res.json({ success: false, error: err });
    }
  
    return res.json(user);
  }
  module.exports.update = update;
  
  //Create a new user
  const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, user, userInfo;
  
    userInfo = req.body;
    [err, user] = await to(Users.create(userInfo));
    if (err) {
      if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
      }
  
      if (typeof code !== 'undefined') res.statusCode = code;
      res.statusCode = 422; // unprocessable entity
      return res.json({ success: false, error: err });
    }
    [err, user] = await to(user.save());
    if (err) {
      if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
      }
  
      if (typeof code !== 'undefined') res.statusCode = code;
      res.statusCode = 422
      return res.json({ success: false, error: err });
  
    }
    res.statusCode = 201;
    return res.json(user);
  }

  module.exports.create = create;
