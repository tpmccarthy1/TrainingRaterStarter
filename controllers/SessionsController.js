const Sessions = require('../models').Sessions;

//Get all sessions
const getAll = async function ( req, res ) {
    res.setHeader('Content-Type', 'application/json');
    let err, sessions;

    let whereStatement = {};
    if (req.query.name) {
        whereStatement.Statement.name = {
            $like: '%' + req.query.name + '%'
        };
    }

    [err, sessions] = await to(Sessions.findAll({ where: whereStatement}))

    return res.json(sessions);
}

module.exports.getAll = getAll;

//Get a single session 
const get = async function (req, res) {
    
    let err, session;
    let sessionId = parseInt(req.params.sessionId)
    res.setHeader('Content-Type', 'application/json');
  
    [err, session] = await to(Sessions.findById(sessionId))
    if (!session) {
      res.statusCode = 404;
      return res.json({ success: false, error: err });
    }
    return res.json(session);
  }

module.exports.get = get;

//Update a single session
const update = async function (req, res) {
    let err, session, data;
    data = req.body;
  
    [err, session] = await to(Sessions.update(data, {
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
  
    return res.json(session);
  }
  module.exports.update = update;
  
  //Create a new session
  const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, session, sessionInfo;
  
    sessionInfo = req.body;
    [err, session] = await to(Sessions.create(sessionInfo));
    if (err) {
      if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
      }
  
      if (typeof code !== 'undefined') res.statusCode = code;
      res.statusCode = 422; // unprocessable entity
      return res.json({ success: false, error: err });
    }
    [err, session] = await to(session.save());
    if (err) {
      if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
      }
  
      if (typeof code !== 'undefined') res.statusCode = code;
      res.statusCode = 422
      return res.json({ success: false, error: err });
  
    }
    res.statusCode = 201;
    return res.json(session);
  }

module.exports.create = create;
