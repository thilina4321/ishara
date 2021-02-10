const Customer = require("../model/customer");
const Vehicle = require("../model/vehicle");
const Appointment = require("../model/appointment");
const SuperAdmin = require("../model/super-admin");
const ServiceAgent = require("../model/service-agent");
const ServiceRecord = require("../model/service-records");
const bcrypt = require('bcryptjs')

exports.registor = async (req, res) => { 
  const adminData = req.body;

  try {
    const password = await bcrypt.hash(adminData.password, 8)
    const admin = new SuperAdmin({ ...adminData,password, role: "ADMIN" });
    const save = await admin.save();
    res.send({ admin: save });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const adminData = req.body;
  console.log(adminData);
  try {
    const {user, error} = await SuperAdmin.loginWithEmailAndPassword(adminData);
    if(error){
      return res.status(500).send({ error });
    }
    const {token, error:tokenError} = await user.generateToken();
    if(tokenError){
      return res.status(500).send({ error:tokenError });
    }
    res.send({ admin: user, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.serviceAgent = async (req, res) => {
  const agentData = req.body;
  try {
    const password = await bcrypt.hash(agentData.password, 8)
    const agent = new ServiceAgent({ ...agentData,password, role: "AGENT" });
    const save = await agent.save();
    res.send({ agent: save });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getCustomers = async (req, res) => {

  try {
      const customers = await Customer.find()
      res.send({customers})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {

  try {
      const vehicles = await Vehicle.find()
      res.send({vehicles})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getServiceRecords = async (req, res) => {

  try {
      const records = await ServiceRecord.find()
      res.send({records})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// exports.customerVehicle = async(req,res)=>{
//     try {

//     } catch (error) {
// res.status(500).send({error:error.message})
//     }
// }
