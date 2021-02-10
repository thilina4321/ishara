const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  customerId:{
      type:Schema.Types.ObjectId, ref:'Customer'
  },
  vehicleNumber:String,
  vehicleType:String,
  vehicleColor:String,
  
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
