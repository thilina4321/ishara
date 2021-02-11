const express = require('express')
const router = express.Router()

const controller = require('../controller/service-agent')
const Auth = require('../middleware/service-agent')

router.post('/login', controller.login)
router.post('/record',Auth, controller.createRecord)
router.patch('/edit/:id',Auth, controller.editRecord)
router.delete('/delete/:id',Auth, controller.deleteRecord)
// router.get('/upcomming',Auth, controller.showupCommingAppoinments)
router.get('/upcomming', controller.showupCommingAppoinments)
router.get('/search',Auth, controller.searchAppointment)
router.post('/appo-status',Auth, controller.approveOrRejectAppointment)

module.exports = router