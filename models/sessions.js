'use strict';

module.exports = (sequelize, DataTypes) => {
    var sessions = sequelize.define('Sessions', {
        name: { type: DataTypes.STRING, allowNull: false },
        startTime: { type: DataTypes.DATE, allowNull: false },
        location: DataTypes.STRING
    }, {});
    return sessions;
};