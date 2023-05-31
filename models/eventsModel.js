const mongoose = require('mongoose');
const moment = require('moment');

const sensorDataSchema = new mongoose.Schema(
  {
    Time: [Date],
    Sensor: {
      type: {
        type: Number,
        required: true,
      },
      Unit: {
        type: String,
        required: true,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
