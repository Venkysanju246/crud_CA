const express = require("express")
const UserRoute = express.Router() 
const bcrypt = require("bcrypt")
const CrudModel = require("../model/model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

UserRoute.post("/register",async (req, res)=>{

    const regularexpression = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/

   const {email, password, location} = req.body

   const result = regularexpression.test(password)

   const checkUser = await CrudModel.findOne({email})
   if(checkUser){
    return res.status(400).send({
        msg:"User Already Registered"
    })
   }
   if(result){
    bcrypt.hash(password, 5,async (err, hash)=>{
        const newUser = new CrudModel({email, password:hash, location})
        await newUser.save()
       })
       res.status(201).send({
        msg:"User Registered"
       })
   }else{
    return res.status(400).send({
        msg:"Password should  contain at least one Uppercharacter/one Number/one Symbol/8 Character"
    })
   }
 
})

UserRoute.post("/login", async(req, res)=>{
     const {email, password} = req.body
     const checkUser = await CrudModel.findOne({email})
     if(checkUser){
        bcrypt.compare(password, checkUser.password, async(err, result)=>{
               if(result){
                const token = jwt.sign({userID: checkUser._id}, process.env.jwt_secret, { expiresIn: "7d" })
                console.log("login", token)
                res.cookie("token", token, {maxAge:1000*60*2000})
                return res.status(200).send({
                    msg:"User Login Success",
                    token: token,
                })
               }else{
                return res.status(400).send({
                    msg:"opps...incorrect password"
                })
               }
        })
     }else{
        return res.status(400).send({
        msg:"user not found, please Register..."
        })
     }

})

module.exports = UserRoute