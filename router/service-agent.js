const express = require('express')
const router = express.Router()

const controller = require('../controller/service-agent')
const Auth = require('../middleware/service-agent')

router.post('/login', controller.login)
router.post('/record',Auth, controller.createRecord)
router.patch('/edit',Auth, controller.editRecord)
router.delete('/delete',Auth, controller.deleteRecord)
router.get('/appintmants',Auth, controller.appointments)
router.post('/decision',Auth, controller.appointmentDecision)


module.exports = router