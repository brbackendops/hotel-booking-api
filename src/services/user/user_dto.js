const yup = require('yup');


const userSchema = yup.object({
    firstName: yup.string().min(5).max(100).required(),
    lastName: yup.string().min(1).max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
})

const userLoginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})


module.exports = {
    userSchema,
    userLoginSchema,
}