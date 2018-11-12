'use strict';

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    userName: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    birthday:{type: DataTypes.DATE, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    joinDate: {type: DataTypes.DATE, allowNull: false},
  }, {});
  
  return Users;
};