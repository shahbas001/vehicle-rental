'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    define: {
      underscored: true,        // Convert camelCase to snake_case
      createdAt: 'created_at',  // Map createdAt to created_at
      updatedAt: 'updated_at',  // Map updatedAt to updated_at
      freezeTableName: true     // Prevent pluralization
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    define: {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true
    }
  });
}

// Auto-load models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Auto-run associate functions if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add custom associations
db.VehicleType.hasMany(db.Vehicle);
db.Vehicle.belongsTo(db.VehicleType);
db.Vehicle.hasMany(db.Booking);
db.Booking.belongsTo(db.Vehicle);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;