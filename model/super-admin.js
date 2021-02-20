const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  role: { type: String, default:"SUPER_ADMIN" },
  tokens: [{ token: String }],
});

adminSchema.statics.loginWithEmailAndPassword = async (credential) => {
  try {
    const user = await SuperAdmin.findOne({ email: credential.email });
    if (!user) {
      return {error:"Invalid email"}
    }

    console.log(user);
    const compare = await bcrypt.compare(credential.password, user.password);
    if (!compare) {
      return {error:"Password not matched "}

    }

    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

adminSchema.methods.generateToken = async function () {
  const user = this;

  try {
    const token = jwt.sign({ id: user._id }, "ishara", {
      expiresIn: "1h",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return { token };
  } catch (error) {
    return { error: error.message };
  }
};

const SuperAdmin = mongoose.model("SuperAdmin", adminSchema);
module.exports = SuperAdmin;
