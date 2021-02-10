const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const superAdmin = new Schema({
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  superAdminName: {
    type: String,
  },
  role:{type:String},

  superAdminAddress: String,
  superAdminTeleNumber: String,
  superAdminNIC: String,
  tokens:[
    {token:String}
  ]
});

superAdmin.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await SuperAdmin.findOne({ email: credential.email });
    if (!user) {
      throw new Error("Loging Error");
    }

    console.log(user);
    const compare = await bcrypt.compare(credential.password, user.password);
    if (!compare) {
      throw new Error("Password is not matched");
    }
  
    return {user};
  } catch (error) {
    return {error:error.message}
  }
    
  };
  
  superAdmin.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
  
    delete userObject.tokens;
    delete userObject.password;
  
    return userObject;
  };
  
  superAdmin.methods.generateToken = async function () {
    const user = this;
  
    try {
      const token = jwt.sign({ id: user._id }, "hasantha", {
        expiresIn: "1h",
      });
      user.tokens = user.tokens.concat({ token });
      await user.save();
      return {token};
    } catch (error) {
      return {error:error.message}
    }
  };
    
  
  const SuperAdmin = mongoose.model("SuperAdmin", superAdmin);
  module.exports = SuperAdmin


