'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {  // lowercase table name
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_time: {  // snake_case
        type: Sequelize.DATE
      },
      end_time: {  // snake_case
        type: Sequelize.DATE
      },
      customer_name: {  // snake_case
        type: Sequelize.STRING
      },
      customer_contact: {  // snake_case
        type: Sequelize.STRING
      },
      vehicle_id: {  // snake_case
        type: Sequelize.INTEGER,
        references: {
          model: 'vehicles',  // lowercase reference
          key: 'id'
        }
      },
      created_at: {  // snake_case
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {  // snake_case
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');  // lowercase
  }
};