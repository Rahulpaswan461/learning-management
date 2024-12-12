const JWT = require("jsonwebtoken")
const secret = "rahul@123"

function createTokenForAuthenticateUser(user){
    const payload = {
        _id:user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    return JWT.sign(payload,process.env.SECRET)
}

function verifyTokenForUser(token){
    return JWT.verify(token,process.env.SECRET)
}

module.exports = {
    createTokenForAuthenticateUser,
    verifyTokenForUser
}