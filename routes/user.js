const { Router } = require("express");
const express=require("express");
// const Router =express.Router();
const userRouter=Router();
const {userModel}=require("../db")
const {z}=require("zod");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD="user123";
userRouter.use(express.json());

userRouter.post("/signup",async(req,res)=>{
    
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
         await userModel.create({
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

userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;

    const response = await userModel.findOne({
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
        },JWT_USER_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

module.exports={
    userRouter:userRouter
} 