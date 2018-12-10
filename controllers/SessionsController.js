const Sessions = require('../models').Sessions;
const Ratings = require('../models').Ratings;

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

    [err, sessions] = await to(Sessions.findAll({ include: [{ model: Ratings }], where: whereStatement}))

    if (err) {
      return ReE(res, err, 404);
    }

    let sessionsWithAverage = [];
    for(let i in sessions){
      let sessionInfo = sessions[i].toJSON();
      sessionInfo.avgRating = 0;
      for(let r in sessionInfo.Ratings) {
        sessionInfo.avgRating += parseInt(sessionInfo.Ratings[r].rating);
      }

      if (sessionInfo.Ratings.length > 0) {
        sessionInfo.avgRating = sessionInfo.avgRating / sessionInfo.Ratings.length;
      }
      sessionsWithAverage.push(sessionInfo);
    }     
    return ReS(res, sessionsWithAverage, 200);
}

module.exports.getAll = getAll;

//Get a single session 
const get = async function (req, res) {
    
    let err, session;
    let sessionId = parseInt(req.params.sessionId)
    res.setHeader('Content-Type', 'application/json');
  
    [err, session] = await to(Sessions.findById(sessionId));

    if (!session) {
      return ReE(res, err, 404);
    }

    return ReS(res, session, 200);
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
      return ReE(res, err, 422);
    }

    return ReS(res, session, 200);
  }
module.exports.update = update;
  
//Create a new session
const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, session, sessionInfo;
  
    sessionInfo = req.body;
    [err, session] = await to(Sessions.create(sessionInfo));
    if(err) {
        console.log(err);
        return ReE(res, err, 422);
      } 
      // Success
      return ReS(res, session, 201);
  }

module.exports.create = create;

// Delete session function
const deleteSession = async function (req, res){
  res.setHeader('Content-Type', 'application/json');
  let sessionId = parseInt(req.params.sessionId);

  let err, session;
  [err, session] = await to(Sessions.destroy({ where: { id: sessionId } }));

  if (err) {
    return ReE(res, err, 422);
  }
  
  // Success
  return ReS(res, session, 200);
}

module.exports.deleteSession = deleteSession;
