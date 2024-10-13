const router = require('express').Router()
const UserRepo = require('../repo/user_repo')
const UserService = require('../services/user/user_serv')
const UserController = require('../controllers/user_c')
const { userSchema , userLoginSchema } = require('../services/user/user_dto')
const { verifyUserSchema } = require('../middlewares/dto_validate')

let ur = new UserRepo()
let us = new UserService(ur)
let uc = new UserController(us)

router.route('/create').post(verifyUserSchema(userSchema),uc.registerUser.bind(uc))
router.route('/login').post(verifyUserSchema(userLoginSchema),uc.loginUser.bind(uc))


module.exports = router