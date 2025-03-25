const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const uri = 'mongodb+srv://suhas:suhasmk%40%23779@ecommerce.4b9or.mongodb.net/myDatabase?retryWrites=true&w=majority';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));




app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type", // Allows Content-Type header
        "Cache-Control", // Allows Cache-Control header
        "Authorization", // Allows Authorization header
        "X-Requested-With", // Allows X-Requested-With header for AJAX requests
        "Accept", // Allows Accept header
        "Origin", // Allows Origin header
        "Referer", // Allows Referer header
        "User-Agent", // Allows User-Agent header
        "Accept-Encoding", // Allows Accept-Encoding header
        "Accept-Language", // Allows Accept-Language header
        "DNT", // Allows Do Not Track header
        "If-Modified-Since", // Allows If-Modified-Since header
        "Range", // Allows Range header
        "Content-Length", // Allows Content-Length header
    ],
    credentials: true
}))

const PORT = 8001
const Auth = require('./Route/Auth')
const Index = require('./Route/ProductsCRUDOperations/Index')
const ProductDetails = require('./Route/ProductDetails')
const Shopproducts = require('./Route/Shoppingproducts')
const Cart = require('./Route/Cart-route')
const Address = require('./Route/Address-route')
const Order = require('./Route/Order_Route')
const adminOrder = require('./Route/AdminOrder')
const testimonials = require('./Route/testimonials')
const searchItems = require('./Route/Searchitems')
const reviews = require('./Route/Review')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join(__dirname, 'Multer', 'Uploads')))
console.log(__dirname);


app.post('/', (req, res) => {
    console.log(req.body)
})
app.use('/auth', Auth)
app.use('/image', Index)
app.use('/Admin', ProductDetails)
app.use('/shop', Shopproducts)
app.use('/cart', Cart)
app.use('/address', Address)
app.use('/order', Order)
app.use('/adminorder', adminOrder)
app.use('/testimonials', testimonials)
app.use('/search', searchItems)
app.use('/review', reviews)






app.listen(PORT, () => {
    console.log("The server is Running in the Port", PORT)
})