const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  
  vehicleId:{
      type:Schema.Types.ObjectId,
      ref:'Vehicle'
  },
  customerId:{
    type:Schema.Types.ObjectId,
    ref:'Customer'
  },
  serviceCategory:String,
  date:{
    type:Date,
    default:Date.now()
  },
  price:{
      type:Number

  }
  
});

module.exports = mongoose.model("Appointment", appointmentSchema);
