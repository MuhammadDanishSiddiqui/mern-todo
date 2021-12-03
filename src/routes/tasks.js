const express = require("express")
const router = new express.Router()
const Task = require("../models/tasks")
const auth = require("../middleware/auth")

router.post("/task",auth, async (req, res) => {

    try {
        const task = new Task({...req.body,owner:req.user._id})
        await task.save()
        res.status(201).send({message:"New task added successfully",task})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/task", auth,async (req, res) => {
    try {
       
        if(!req.query.completed || req.query.completed === "all")
        {
            const tasks = await Task.find({owner:req.user._id})
            res.send(tasks)
            return
        }
        if(req.query.completed === "completed" )
        {
            const tasks = await Task.find({owner:req.user._id,completed:true})
            res.send(tasks)
            return  
        }
        if(req.query.completed === "not completed" )
        {
            const tasks = await Task.find({owner:req.user._id,completed:false})
            res.send(tasks)
            return  
        }

       
 
    } catch (error) {
        res.status(500).send(error)
    }
})



router.patch("/task/:id",auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidUpdates = updates.every(update=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdates)
    {
        return res.status(400).send({message:"Invalid updates"})
    }

    try {
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        updates.forEach(update => {
            task[update]=req.body[update]
        });
        await task.save()
        res.send({message:"Task updated successfully",task})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/task/:id",auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send({message:"Task deleted successfully",task})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router