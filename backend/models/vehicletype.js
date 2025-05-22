// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class VehicleType extends Model {
  
//     static associate(models) {
//       // define association here
//     }
//   }
//   VehicleType.init({
//     name: DataTypes.STRING,
//     category: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'VehicleType',
//   });
//   return VehicleType;
// };

module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    tableName: 'vehicle_types',
    underscored: true
  });

  // Add this association
  VehicleType.associate = (models) => {
    VehicleType.hasMany(models.Vehicle, { 
      foreignKey: 'vehicle_type_id',
      as: 'vehicles' // optional alias
    });
  };

  return VehicleType;
};