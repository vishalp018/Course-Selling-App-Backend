const { Router } = require("express");
// const express=require("express");
// const Router =express.Router();
const userRouter=Router();
const {userModel}=require("../db")

module.exports={
    userRouter:userRouter
} 