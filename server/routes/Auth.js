const router = require("express").Router();
const dotenv = require("dotenv");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = require("../models/User");


//register
router.post("/register", async(req , res) => {
    try{
        const userInfo = req.body

        const duplicateEmail = await userSchema.find({
            email: userInfo.email
        })
        if (duplicateEmail.length >= 1) return res.send('Email already exists').status(409)

        const duplicateUsername = await userSchema.find({
            username: userInfo.username
        })
        if (duplicateUsername.length >= 1) return res.send('Username already exists').status(409)

        const newUser = userSchema({
            username: userInfo.username,
            email: userInfo.email,
            Image: userInfo.Image,
            password: crypto.createHash(process.env.HASHTYPE).update(userInfo.password).digest(process.env.ENCODEAS)
        })
        await newUser.save();

        res.status(200).json("User created successfully")

    }catch(err){
        console.log("error at user register route")
        res.status(500).json(err)
    }
})

//login
router.post("/login", async (req,res) => {
    try{
        const userInfo = req.body
        const userFound = await userSchema.findOne({email: userInfo.email})
            
        if(!userFound) return res.status(400).json("User not found")

        if(crypto.createHash(process.env.HASHTYPE).update(userInfo.password).digest(process.env.ENCODEAS) != userFound.password)
            return res.status(403).json("Incorrect password")

            if(userFound.isAdmin == false){
                 const payload = { userFound }
                 await jwt.sign({user:userFound, role: "user"}, process.env.JWTSECRET, async (err, token) => {
                 await res.cookie("jwt", `${token}`, {httpOnly:true})
                 res.status(200).json("you are logged in with a token as a user")
                 }) 
            } else {
                const payload = { userFound }
                await jwt.sign({admin:userFound, role: "admin"}, process.env.JWTSECRET, async (err, token) => {
                await res.cookie("jwt", `${token}`, {httpOnly:true})
                res.status(200).json("you are logged in with a token as an admin")
                }) 
            }

       

    } catch(err) {
        console.log("error at user login route")
        res.status(500).json(err)
    }
})

// logout
router.get("/logout", async(req,res) => {
    try {
         await res.clearCookie("jwt");
    res.status(200).json("you have been logged out")
    } catch (err) {
        consolee.log("error at user lougout")
        res.status(500).json(err)
    }
   
})

module.exports = router;