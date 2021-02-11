const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vehicleNo: String,
  model: String,
  brand: String,
  registrationYear: String,
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
