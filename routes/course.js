const { Router } = require("express");
const courseRouter=Router();
const {courseModel}=require("../db")

module.exports={
    courseRouter:courseRouter
}