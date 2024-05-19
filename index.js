// const express=require('express');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connecttDb from './Config/db.js';
import UserRoute from "./Routes/UserRoute.js"
//detenv config
dotenv.config()
const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/auth",UserRoute);




connecttDb();
//port 
const Port=process.env.PORT || 5000;
app.listen(Port,(err)=>{
    if(err)
        {
        return console.log("failed to connect");
    }
    console.log(`server running on ${Port}`);
})