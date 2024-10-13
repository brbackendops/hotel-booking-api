
const verifyUserSchema = (schema) => async(req,res,next) => {
    try {
        await schema.validate(req.body)
        return next()
    } catch (error) {
        return res.status(400).json({
            status: "error",
            error: {
                type: error.name,
                message: error.message
            }
        })
    }
}


module.exports = {
    verifyUserSchema,
}