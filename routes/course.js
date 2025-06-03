const { Router } = require("express");
const courseRouter=Router();
const express=require("express")
const {purchaseModel, courseModel}=require("../db")
const {userMiddleware}=require("../Middleware/user")
courseRouter.use(express.json());


courseRouter.post("/purchase",userMiddleware ,async(req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
    //student has actully paidthe price
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        msg:"You have successfully bought the course"
    })

})

courseRouter.get("/preview",async(req,res)=>{
    const courses=await courseModel.find({});
    res.json({
        courses
    })
})

module.exports={
    courseRouter:courseRouter
}