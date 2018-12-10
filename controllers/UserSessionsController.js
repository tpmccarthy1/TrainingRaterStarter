const UserSessions = require('../models').UserSessions;

// Create 
  const register = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, registration, registrationInfo;
  
    registrationInfo = req.body;
    [err, registration] = await to(UserSessions.create(registrationInfo));
    if(err) {
      console.log(err);
      return ReE(res, err, 422);
    } 
    // Success
    return ReS(res, registration, 201);
}

  module.exports.register = register;

//Update a single session
const rated = async function (req, res) {
  let err, registration, data;
  data = req.body;

  [err, session] = await to(UserSession.update(data, {
    where: {
      id: data.id
    }
  }));
 
  if (err) {
    return ReE(res, err, 422);
  }

  return ReS(res, registration, 200);
}
module.exports.rated = rated;