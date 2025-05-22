// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Booking extends Model {
  
//     static associate(models) {
//       // define association here
//     }
//   }
//   Booking.init({
//     startTime: DataTypes.DATE,
//     endTime: DataTypes.DATE,
//     customerName: DataTypes.STRING,
//     customerContact: DataTypes.STRING,
//     vehicleId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Booking',
//   });
//   return Booking;
// };


module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    customer_name: DataTypes.STRING,
    customer_contact: DataTypes.STRING,
    vehicle_id: DataTypes.INTEGER
  }, {
    tableName: 'bookings',
    underscored: true
  });

  // Add this association
  Booking.associate = (models) => {
    Booking.belongsTo(models.Vehicle, { 
      foreignKey: 'vehicle_id',
      as: 'vehicle' // optional alias
    });
  };

  return Booking;
};