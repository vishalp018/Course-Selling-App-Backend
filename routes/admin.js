const {Router}=require("express");
const adminRouter=Router(); 
const {adminModel}=require("../db")

adminRouter.post("/get",(req,res)=>{
    res.json({
        "msg":"Hello vishal pal"
    })
})


module.exports={
    adminRouter:adminRouter
}