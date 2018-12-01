'use strict';
const bycrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    userName: {type: DataTypes.STRING, allowNull: false, unique: true },
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    birthday:{type: DataTypes.DATE, allowNull: true},
    phone:{type: DataTypes.STRING, allowNull: true, validate: { len: {args: (7,20), msg: 'Phone number invalid'}, isNumeric: {msg: 'Not a valid phone number.'}} },
    email: {type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: {message: "Email is invalid"} }},
    joinDate: {type: DataTypes.DATE, allowNull: false},
    isTrainer: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    password: {type: DataTypes.STRING, allowNull: false}
  });
  // hook to hash and salt password before user is saved to DB
  Users.beforeSave(async (user) => {
    let err;
    if (user.changed('password')) {

      let salt, hash;
      [err, salt] = await to(bycrypt.genSalt(10));
      if(err){ TE(err.message, true); }

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if(err){ TE(err.message, true); }

      user.password = hash;
    }
  })
    
  return Users;
};