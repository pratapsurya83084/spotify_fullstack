import express from "express";
import dotenv from "dotenv";
import { sql } from "./src/config/db.connection.js";
import adminRoute from './src/route.js';
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary'
import  redis from 'redis';
import cors from 'cors';




cloudinary.config({ 
  cloud_name: process.env.cloud_Name, 
  api_key: process.env.Cloud_Api_key, 
  api_secret: process.env.Cloud_Api_Secret,
});






const app = express();
dotenv.config();

app.use(cors({
  origin:"*",
  credentials:true
}))


export const Redisclient = redis.createClient({

password:process.env.Redis_password,
socket:{
    host:"redis-15483.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port:15483,
}

});

Redisclient.connect().then(()=>{
    console.log("Connected to Redis...");
})
.catch((err)=>{ console.log("error in connecting to Redis",err);});











app.use(express.json());
app.use(cookieParser());




async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS albums(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description  VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    await sql`
        CREATE TABLE IF NOT EXISTS songs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description  VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255),
        audio    VARCHAR(255) NOT NULL,
        album_id INTEGER REFERENCES albums(ID)  ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    console.log("database initialized successfully ");
  } catch (error) {
    console.log("Error initDB ", error);
  }
}

initDB().then(() => {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
});

app.get('/u',(req,res)=>{
  res.send("work here...");
})

//routes
app.use("/api/v1", adminRoute);

