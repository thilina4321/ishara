const jwt = require("jsonwebtoken");
const Agent = require("../model/service-agent");

const agent = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const verifiedToken = await jwt.verify(token, "hasantha");
    const user = await Agent.findOne({
      _id: verifiedToken.id,
      "tokens.token": token,
    });

    if(!user){
      throw new Error('No access')
    }

    if(user.role != 'AGENT'){
        throw new Error('Access not allowed')
    }

    req.agent = user._id
    next();

  } catch (err) {
    res.status(422).send({error:err.message})
  }
};

module.exports = agent;