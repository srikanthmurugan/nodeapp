const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  timestamp: Date,
  temperature: Number,
  humidity: Number,
  efficiency: Number,
  status: String,
  duration: Number
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
