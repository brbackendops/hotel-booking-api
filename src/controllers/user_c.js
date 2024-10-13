

module.exports = class UserController {
    constructor(userService){
        this.userService = userService;
    }

    async registerUser(req,res) {
        try {
            let user = await this.userService.registerService(req.body)
            return res.status(201).json({
                status: "success",
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                "status": "error",
                "error": error.message || error
            })
        }
    }

    async loginUser(req,res) {
        try {
            const user_json = await this.userService.loginService(req,res)
            return res.status(200).json(user_json)
        } catch (error) {            
            res.status(500).json({
                "status": "error",
                "error": error
            })
        }
    }
}