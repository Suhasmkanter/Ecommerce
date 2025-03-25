const multer = require('multer')
const path = require('path')
console.log(__dirname + 'UPloads')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(req.body)
        callback(null, path.join(__dirname, 'Uploads'))
    },
    filename: function (req, file, call) {
        console.log(file)
        call(null, file.originalname)
    }
})


const upload = multer({ storage: storage })

module.exports = upload