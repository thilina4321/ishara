const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
  schedule: { type: String },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    default:'PENDING'
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
