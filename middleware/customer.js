const jwt = require("jsonwebtoken");
const Customer = require("../model/customer");

const customer = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const verifiedToken = await jwt.verify(token, "ishara");
    const user = await Customer.findOne({
      _id: verifiedToken.id,
      "tokens.token": token,
    });

    if(!user){
      throw new Error('No access')
    }

    if(user.role != 'CUSTOMER'){
        throw new Error('Access not allowed')
    }

    req.customer = user._id
    next();

  } catch (err) {
    res.status(422).send({error:err.message})
  }
};

module.exports = customer;