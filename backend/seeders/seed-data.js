'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert vehicle types (using snake_case)
    const types = await queryInterface.bulkInsert('vehicle_types', [
      { 
        name: 'Hatchback', 
        category: 'car', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        name: 'SUV', 
        category: 'car', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        name: 'Sedan', 
        category: 'car', 
        created_at: new Date(), 
        updated_at: new Date() 
      },
      { 
        name: 'Sports', 
        category: 'bike', 
        created_at: new Date(), 
        updated_at: new Date() 
      }
    ], { returning: true });

    // Insert vehicles (using snake_case)
    const vehicles = [];
    for (const type of types) {
      vehicles.push({
        name: `${type.name} 1`,
        vehicle_type_id: type.id,  // snake_case
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    
    await queryInterface.bulkInsert('vehicles', vehicles);  // lowercase table name
  },

  down: async (queryInterface) => {
    // Clean up in reverse order (using snake_case)
    await queryInterface.bulkDelete('bookings', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('vehicle_types', null, {});
  }
};