const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const auth = require("../middleware/auth")

router.post("/user", async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if(user)
    {
        return res.status(400).send({message:"User already exit"})
    }
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({message:"Singned up successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/user/login", async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({message:"Logged in successfully",token})
 
    } catch (error) {
        res.status(400).send({message:error})
    }
})

router.post("/user/logout",auth, async (req, res) => {

    try {
     req.user.tokens = req.user.tokens.filter(token=>{
         return token.token != req.token
     })
     await req.user.save()
        res.send({message:"Logged out successfully"})
 
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/user/logoutAll",auth, async (req, res) => {

    try {
     req.user.tokens = []
     await req.user.save()
        res.send({message:"Logged out successfully from all devices"})
 
    } catch (error) {
        res.status(500).send(error)
    }
})



router.get("/user/profile",auth, async (req, res) => {
res.send({user:req.user})
})



router.patch("/user/me",auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidUpdates = updates.every(update=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdates)
    {
        return res.status(400).send({message:"Invalid updates"})
    }

    try {
        // const user = await User.findOne({_id:req.user._id})
        updates.forEach(update => {
            req.user[update]=req.body[update]
        });
        await req.user.save()
        res.send({message:"Profile updated successfully",user:req.user})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/user/me",auth, async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.user.id)
        res.send({message:"Account deleted successfully"})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router