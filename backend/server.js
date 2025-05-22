require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const { Op } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(express.json());
const allowedOrigins = ['http://localhost:5174', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

sequelize.options.define = {
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
};

app.get('/vehicle-types', async (req, res) => {
  try {
    const types = await sequelize.models.VehicleType.findAll({
      attributes: ['id', 'name', 'category']
    });

    
    const grouped = {
      '2': types.filter(t => t.category === 'bike'),
      '4': types.filter(t => t.category === 'car')
    };
    
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/vehicles/by-type/:typeId', async (req, res) => {
  try {
    const vehicles = await sequelize.models.Vehicle.findAll({
      where: { vehicle_type_id: req.params.typeId },
      include: [{
        model: sequelize.models.VehicleType,
        attributes: ['name']
      }],
      attributes: ['id', 'name']
    });
    
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/vehicles/:id/availability', async (req, res) => {
  try {
    const { start, end } = req.query;
    const conflicts = await sequelize.models.Booking.count({
      where: {
        vehicle_id: req.params.id,
        [Op.or]: [
          { start_time: { [Op.between]: [start, end] } },
          { end_time: { [Op.between]: [start, end] } }
        ]
      }
    });
    
    res.json({ available: conflicts === 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/vehicles', async (req, res) => {
  try {
    const { name, vehicleTypeId } = req.body;
    
    if (!name || !vehicleTypeId) {
      return res.status(400).json({ error: 'Name and vehicleTypeId are required' });
    }

    const vehicleType = await sequelize.models.VehicleType.findByPk(vehicleTypeId);
    if (!vehicleType) {
      return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    const vehicle = await sequelize.models.Vehicle.create({
      name,
      vehicle_type_id: vehicleTypeId
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/bookings', async (req, res) => {
  try {
    const { 
      firstName,
      lastName,
      vehicleId,
      startTime, 
      endTime
    } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !vehicleId || !startTime || !endTime) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const vehicle = await sequelize.models.Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(400).json({ error: 'Vehicle not found' });

    // Check availability
    const existing = await sequelize.models.Booking.findOne({
      where: {
        vehicle_id: vehicleId,
        [Op.or]: [
          { start_time: { [Op.between]: [startTime, endTime] } },
          { end_time: { [Op.between]: [startTime, endTime] } }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ 
        error: 'Vehicle not available for selected dates',
        available: false
      });
    }

    // Create booking
    const booking = await sequelize.models.Booking.create({
      vehicle_id: vehicleId,
      start_time: startTime,
      end_time: endTime,
      customer_name: `${firstName} ${lastName}`,
      customer_contact: req.body.email || 'N/A'
    });

    res.json({
      success: true,
      booking: {
        id: booking.id,
        vehicle: vehicle.name,
        dates: `${startTime} to ${endTime}`,
        customer: `${firstName} ${lastName}`
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/bookings', async (req, res) => {
  try {
    const bookings = await sequelize.models.Booking.findAll({
      include: [{
        model: sequelize.models.Vehicle,
        include: [sequelize.models.VehicleType]
      }],
      attributes: ['id', 'start_time', 'end_time', 'customer_name', 'customer_contact', 'created_at', 'updated_at']
    });

    res.json(bookings.map(b => ({
      id: b.id,
      startTime: b.start_time,
      endTime: b.end_time,
      customerName: b.customer_name,
      customerContact: b.customer_contact,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
      vehicle: b.Vehicle ? {
        id: b.Vehicle.id,
        name: b.Vehicle.name,
        type: b.Vehicle.VehicleType
      } : null
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// In server.js, before your test() function
// const createTestData = async () => {
//   await sequelize.models.VehicleType.create({
//     name: 'Sedan',
//     category: 'car'
//   });
  
//   const vehicle = await sequelize.models.Vehicle.create({
//     name: 'Toyota Camry',
//     vehicle_type_id: 1
//   });
  
//   await sequelize.models.Booking.create({
//     start_time: new Date(),
//     end_time: new Date(Date.now() + 3600000),
//     customer_name: 'Test User',
//     customer_contact: 'test@example.com',
//     vehicle_id: vehicle.id
//   });
// };

// const test = async () => {
//   try {
//     await createTestData(); // First create sample data
    
//     const booking = await sequelize.models.Booking.findOne({
//       include: [
//         { 
//           model: sequelize.models.Vehicle, 
//           include: [sequelize.models.VehicleType] 
//         }
//       ]
//     });
    
//     if (booking) {
//       console.log('Booking with associations:', JSON.stringify(booking.toJSON(), null, 2));
//     } else {
//       console.log('No bookings found');
//     }
//   } catch (error) {
//     console.error('Test failed:', error);
//   }
// };
// test()

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
