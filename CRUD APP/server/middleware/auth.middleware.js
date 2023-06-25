const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next)=>{
  const token = req.headers.authorization
   console.log(token)
   try {
    if(token){
        var decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded; 
        req.body.userID = decoded.userID
        if(decoded){
            next()
        }else{
            return res.status(400).send({
                msg:"Invalid token, Access denied"
            })
        }
       
       }else{
        return res.status(401).send({
            msg:"Token expired/Invalid, please login again!"
        })
       }
   } catch (error) {
    return res.status(401).send({
        msg:"something went wrong"
    })
   }
  
}

module.exports = auth