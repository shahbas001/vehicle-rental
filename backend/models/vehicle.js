// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Vehicle extends Model {
   
//     static associate(models) {
//       // define association here
//     }
//   }
//   Vehicle.init({
//     name: DataTypes.STRING,
//     vehicleTypeId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Vehicle',
//   });
//   return Vehicle;
// };

module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: DataTypes.STRING,
    vehicle_type_id: DataTypes.INTEGER
  }, {
    tableName: 'vehicles',
    underscored: true
  });

  // Add these associations
  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.VehicleType, { 
      foreignKey: 'vehicle_type_id',
      as: 'type' // optional alias
    });
    Vehicle.hasMany(models.Booking, {
      foreignKey: 'vehicle_id',
      as: 'bookings' // optional alias
    });
  };

  return Vehicle;
};