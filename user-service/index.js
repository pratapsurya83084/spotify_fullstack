import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter  from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';







dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.error("DB connection failed ❌", error.message);
  }
};

connectDb();





const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("User service is running 🚀");
});



//user routes

app.use('/api/v1',UserRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
