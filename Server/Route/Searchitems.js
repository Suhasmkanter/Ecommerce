const express = require('express')
const { Fetchalltheitems } = require('../Controllers/Searchitems_controller')
const Router = express.Router()


Router.get('/fetch/:keyword', Fetchalltheitems)

module.exports = Router