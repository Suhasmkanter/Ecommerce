const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



async function RegisterHandling(req, res) {


    let { username, password, email } = req.body
    username.trim()

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.json({
                success: false,
                message: 'The User already Exist Please Login'
            })
        } else {
            const hashedpassword = await bcrypt.hash(password, 11)
            const existingUserr = await User({ username, email, password: hashedpassword })
            await existingUserr.save()
            res.json({
                success: true,
                message: 'The User is Successfully Registered'
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: 'The User Does Not Exist Please Register'
        })
    }
}


async function LoginHandleFunction(req, res) {
    let { email, password } = req.body
    try {
        const existingUserr = await User.findOne({ email })
        if (existingUserr) {
            let comparingpassword = await bcrypt.compare(password, existingUserr.password)

            if (comparingpassword) {
                const Token = jwt.sign({
                    UserId: existingUserr._id,
                    username: existingUserr.username,
                    password: existingUserr.password
                }, "SUHAS_M_K", { expiresIn: '600m' })
                res.cookie("Token", Token, { httponly: true }).json({
                    success: true,
                    message: "The user is successfully Logined",
                    user: {
                        UserId: existingUserr._id,
                        user: existingUserr.username,
                        password: existingUserr.password,
                        email: existingUserr.email
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'The Password is Incorrect'
                })
            }
        } else {
            res.json({
                message: false,
                message: 'The User Does Not Exist Please Register'
            })
        }

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: "The User Can't Login There is Some Error "
        })
    }
}


// Auth Middleware for the Reloading the page
async function AuthMiddleware(req, res, next) {
    const Token = req.cookies.Token
    if (!Token) {
        return res.json({
            success: false,
            message: "The User is Not Authenticated"
        })
    }
    try {
        let decode = jwt.verify(Token, "SUHAS_M_K")
        req.user = decode
        next()
    } catch (error) {
        return res.json({
            success: false,
            message: 'The User is Not Authenticated'
        })

    }


}










module.exports = {
    LoginHandleFunction,
    AuthMiddleware,
    RegisterHandling
}