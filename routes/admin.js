const {Router}=require("express");
const express=require("express");
const adminRouter=Router(); 
const {adminModel, courseModel}=require("../db")
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const { adminMiddleware } = require("../Middleware/admin");
adminRouter.use(express.json());


adminRouter.post("/signup",async(req,res)=>{
    
    try{

        const requirebody=z.object({
                email:z.string().min(3).max(22).email(),
                firstname:z.string().min(2).max(10),
                lastname:z.string().min(2).max(10),
                password:z.string().min(8).max(20)
            })
            const parsedata=requirebody.safeParse(req.body);
            if(!parsedata.success){
                res.json({
                    message:"Incorrect data",
                    error:parsedata.error
                })
                return
            }
        const {email,password,firstname,lastname}=req.body; //destructuring
        const hasedPassword = await bcrypt.hash(password, 10);
         await adminModel.create({
                email: email,
                password: hasedPassword,
                firstName: firstname,
                lastName: lastname,
            });
            
            res.json({
                message: "You are signed up"
            })
        }

    catch(e){
        res.status(500).json({
            message: "Error while signing up"            
        })
    }

})

adminRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;

    const response = await adminModel.findOne({
        email: email
    });
        if(!response){
        res.status(403).json({
            message:"User does not exits"
        })
    }
    const passwordmatch=await bcrypt.compare(password,response.password);
    if (passwordmatch) {
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_ADMIN_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/course",adminMiddleware ,async(req,res)=>{
    const adminId=req.userId;
    const {title,description,price,imageUrl}=req.body;
    const course=await courseModel.create({
        title,price,description,imageUrl,creatorId:adminId
    });
    res.json({
        message:"Course added successfully",
        courseId:course._id
    })
})

adminRouter.put("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,description,price,imageUrl,courseId}=req.body;
    const course=await adminModel.updateOne({
        _id:courseId,
        creatorId:adminId

    },{
        title,price,description,imageUrl
    });
    res.json({
        message:"Course updated",
        courseId:course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    // const {title,description,price,imageUrl,courseId}=req.body;
    const course=await courseModel.findOne({
        creatorId:adminId
    })
    res.json({
        message:"Course updated",
        course
    })
})


module.exports={
    adminRouter:adminRouter
}