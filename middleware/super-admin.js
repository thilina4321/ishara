const jwt = require("jsonwebtoken");
const Admin = require("../model/super-admin");

const agent = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const verifiedToken = await jwt.verify(token, "ishara");
    const user = await Admin.findOne({
      _id: verifiedToken.id,
      "tokens.token": token,
    });

    if(!user){
      throw new Error('No access')
    }

    if(user.role != 'ADMIN'){
        throw new Error('Access not allowed')
    }

    req.admin = user._id
    next();

  } catch (err) {
    res.status(422).send({error:err.message})
  }
};

module.exports = agent;