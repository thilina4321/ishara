const express = require('express')
const router = express.Router()

const controller = require('../controller/super-admin')
const Auth = require('../middleware/super-admin')

router.post('/signup', controller.registor)
router.post('/login', controller.login)
router.get('/customer',Auth, controller.getCustomers)
router.get('/vehicles',Auth, controller.getVehicles)
router.get('/records',Auth, controller.getServiceRecords)
router.post('/agent',Auth, controller.serviceAgent) 


module.exports = router