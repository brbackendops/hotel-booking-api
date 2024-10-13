const User = require('../database/models').User;

module.exports = class UserRepo {
    constructor(){
        this.user = User
    }

    async register(userPayload){
        
        try {
            const new_user = await this.user.create(userPayload)
            return new_user
        } catch (error) {
          throw error  
        }
    }

    async getUser(email){
        try {
            const user = await this.user.findOne({
                where: {
                    email
                }
            })

            return user
        } catch (error) {
            
        }
    }
}