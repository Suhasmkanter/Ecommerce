const express = require('express')
const { LoginHandleFunction, RegisterHandling, AuthMiddleware } = require('../Controllers/Auth')
const cookieParser = require('cookie-parser')
const Router = express.Router()
Router.use(express.json())
Router.use(express.urlencoded({ extended: true }))
Router.use(cookieParser())
Router.get('/', (req, res) => {
    console.log(req.body)
})
Router.post('/Login', LoginHandleFunction)
Router.post('/Register', RegisterHandling)
Router.get('/Authmiddle', AuthMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
        message: "The user s Authenticated"
    })
})





module.exports = Router