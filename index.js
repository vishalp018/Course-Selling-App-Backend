const express=require("express");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const mongoose=require("mongoose");
// require('dotenv').config();
// mongoose.connect("mongodb+srv://staff:passwd123@cluster0.pv55fhz.mongodb.net/Course-Selling-App_Backend");

const app=express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main() {
    await mongoose.connect("mongodb+srv://palvishal111:admin123@cluster0.u9vxgyb.mongodb.net/Course-Selling-App_Backend")
    app.listen(3000);
    console.log("listening on port 3000")
}

main()