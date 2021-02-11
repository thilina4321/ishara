const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceAgentId: {
    type: Schema.Types.ObjectId,
    ref: "ServiceAgent",
  },
  category: {
    type: String,
  },
  details: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Service", serviceSchema);
