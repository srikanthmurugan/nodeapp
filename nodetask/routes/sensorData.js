const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensorData'); 

// Hourly aggregation
router.get('/hourly', async (req, res) => {
  try {
    const result = await SensorData.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
            hour: { $hour: "$timestamp" }
          },
          avgTemperature: { $avg: "$temperature" },
          avgHumidity: { $avg: "$humidity" },
          efficiency: { $avg: "$efficiency" },
          uptime: { $sum: { $cond: [{ $eq: ["$status", "1"] }, "$duration", 0] } },
          downtime: { $sum: { $cond: [{ $eq: ["$status", "0"] }, "$duration", 0] } }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Daily aggregation
router.get('/daily', async (req, res) => {
    try {
      const result = await SensorData.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$timestamp" },
              month: { $month: "$timestamp" },
              day: { $dayOfMonth: "$timestamp" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            efficiency: { $avg: "$efficiency" },
            uptime: { $sum: { $cond: [{ $eq: ["$status", "1"] }, "$duration", 0] } },
            downtime: { $sum: { $cond: [{ $eq: ["$status", "0"] }, "$duration", 0] } }
          }
        }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Weekly aggregation
  router.get('/weekly', async (req, res) => {
    try {
      const result = await SensorData.aggregate([
        {
          $group: {
            _id: {
              year: { $isoWeekYear: "$timestamp" },
              week: { $isoWeek: "$timestamp" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            efficiency: { $avg: "$efficiency" },
            uptime: { $sum: { $cond: [{ $eq: ["$status", "1"] }, "$duration", 0] } },
            downtime: { $sum: { $cond: [{ $eq: ["$status", "0"] }, "$duration", 0] } }
          }
        }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Monthly aggregation
  router.get('/monthly', async (req, res) => {
    try {
      const result = await SensorData.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$timestamp" },
              month: { $month: "$timestamp" }
            },
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" },
            efficiency: { $avg: "$efficiency" },
            uptime: { $sum: { $cond: [{ $eq: ["$status", "1"] }, "$duration", 0] } },
            downtime: { $sum: { $cond: [{ $eq: ["$status", "0"] }, "$duration", 0] } }
          }
        }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
