'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserSessions = sequelize.define('UserSessions', {
    sessionId: { type: DataTypes.INTEGER, allowNull: false },
    ratingId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    rated: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
  }, {});

  UserSessions.associate = function (models) {
    models.UserSessions.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    models.UserSessions.belongsTo(models.Sessions, { foreignKey: 'sessionId', targetKey: 'id' });
  };
  return UserSessions;
};
