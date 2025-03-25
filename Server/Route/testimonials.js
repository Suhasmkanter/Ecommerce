const express = require('express')
const { Getalltestimonials } = require('../Controllers/fetchallcontroller')
const Router = express.Router()



Router.get('/fetchall', Getalltestimonials)






module.exports = Router