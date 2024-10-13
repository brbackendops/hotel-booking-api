require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async(req,res,next) => {
    try {
        let token = req.cookies.userToken
        if (!token) {
            throw new Error("user is not authenticated")
        }
        let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if (!decoded) {
            throw new Error("invalid token")
        }
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            "status": "unauthorized",
            "error": error.message
        })
    }
}

module.exports = {
    authenticate,
}