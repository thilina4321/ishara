const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceRecords = new Schema({
  category: {
    type: String,
  },
  
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("ServiceRecord", serviceRecords);
