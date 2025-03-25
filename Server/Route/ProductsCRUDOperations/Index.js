const express = require('express')
const upload = require('../../Multer/index')
const Router = express.Router()

Router.post('/AddProducts', upload.single('file'), (req, res) => {
    res.json({ imageUrl: `http://localhost:8001/images/${req?.file?.filename}` })
})

Router.post('/EditProducts', upload.single('file'), (req, res) => {
    console.log('hello ')
    res.json({ imageUrl: `http://localhost:8001/images/${req?.file?.filename}` })

})






module.exports = Router