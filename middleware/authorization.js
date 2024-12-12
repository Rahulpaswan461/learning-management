function isAdmin(req,res,next){
    if(res.user.role === "user"){
        return res.status(403).json({error:"User are not allowed to created courses : "})
    }
    return next()
}

function isUser(req,res,next){
    if(req.user.role === "admin"){
        return res.status(403).json({error:"Admins are not allowed to enroll !!"})
    }
    return next()
}

module.exports = {
    isAdmin,
    isUser
}