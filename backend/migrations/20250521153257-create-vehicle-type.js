module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('vehicle_types', {  // lowercase
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: { 
      type: Sequelize.STRING 
    },
    category: { 
      type: Sequelize.STRING 
    },
    created_at: {  // snake_case
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {  // snake_case
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('vehicle_types')  // lowercase
};