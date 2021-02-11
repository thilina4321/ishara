const express = require('express')
const router = express.Router()

const controller = require('../controller/super-admin')
const Auth = require('../middleware/super-admin')

router.post('/signup', controller.registor)
router.post('/login', controller.login)

router.post('/customer-add',Auth, controller.addCustomer)
router.patch('/customer-edit/:id',Auth, controller.editCustomer)

router.post('/vehicles-add',Auth, controller.addVehicle)
router.patch('/vehicle-edit/:id',Auth, controller.editVehicle)

router.post('/agent-add',Auth, controller.addServiceAgent)
router.post('/edit-record',Auth, controller.editServiceRecords)
router.get('/delete-record',Auth, controller.deleteServiceRecords)


module.exports = router