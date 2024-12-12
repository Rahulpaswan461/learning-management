const { verifyTokenForUser } = require("../service/jwtAuth")

function checkForAuthenticateUser(cookie){
    return (req,res,next) =>{
          
        if(req.path === "/api/user/signup" || req.path === "/api/user/login"){
            return next()
        }
    
        const token = req.cookies[cookie]

        if(!token){
            return res.status(403).json({error:"Authentication is required !!"})
        }
        
        try{
          const payload = verifyTokenForUser(token)
          req.user = payload
          return next()
        }
        catch(error){
            console.log("There is some error",error)
            return next()
        }

    }
}

module.exports = {
    checkForAuthenticateUser
}