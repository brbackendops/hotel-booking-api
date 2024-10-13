require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


class User {
    constructor(id,email,firstName,lastName,password,createdAt,updatedAt){
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    toJson(){
        return {
            firstName:this.firstName,
            lastName: this.lastName,
            email: this.email
        }
    }
}

module.exports = class UserService {
    constructor(userRepo){
        this.userRepo = userRepo;
    }


    async registerService(payload){
        try {
            const userPayload = {...payload};
            userPayload.password = bcrypt.hashSync(userPayload.password,10)
            const user = await this.userRepo.register(userPayload)

            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        } catch (error) {
            throw error
        }
    }

    async loginService(req,res) {
        try {
            const {email , password} = req.body
            const user = await this.userRepo.getUser(email)
            if (user === null) {
                throw new Error("user not found")
            }

            let is_correct = bcrypt.compareSync(password,user.password);
            if (!is_correct) throw new Error("incorrect password detected");

            let data = {
                username: user.firstName + user.lastName,
                email: user.email,                
            }
            let token = jwt.sign(data,process.env.JWT_SECRET_KEY,{
                expiresIn: "1d"
            })

            res.cookie("userToken",token,{
                maxAge: 86400000 + Date.now()
            })

            return {
                "status": "success",
                "message": "user loggedIn successfully"
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}