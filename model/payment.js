const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  amount: {
    type: Number,
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  time: { type: String },
  amount: { type: Number },
  status: { type: String },
});

module.exports = mongoose.model("Payment", PaymentSchema);
