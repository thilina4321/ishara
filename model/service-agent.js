const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const agentSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userName: {
    type: String,
  },
  role:{type:String, default:'SERVICE_AGENT'},
  
  tokens:[
    {token:String}
  ]
});

agentSchema.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await ServiceAgent.findOne({ email: credential.email });
    if (!user) {
      return {error:"Invalid email "}
    }

    console.log(user);
    const compare = await bcrypt.compare(credential.password, user.password);
    if (!compare) {
      return {error:"Password not matched "}
    }
  
    return {user};
  } catch (error) {
    return {error:error.message}
  }
    
  };
  
  agentSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
  
    delete userObject.tokens;
    delete userObject.password;
  
    return userObject;
  };
  
  agentSchema.methods.generateToken = async function () {
    const user = this;
  
    try {
      const token = jwt.sign({ id: user._id }, "ishara", {
        expiresIn: "1h",
      });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return {token};
    } catch (error) {
      return {error:error.message}
    }
  };
    
    
  const ServiceAgent = mongoose.model("ServiceAgent", agentSchema);
  module.exports = ServiceAgent
