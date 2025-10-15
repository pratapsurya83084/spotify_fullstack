import express from 'express';
import dotenv from 'dotenv';
import SongRouter  from './src/route.js';
import  redis from 'redis';
import cors from 'cors';



const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);


export const Redisclient = redis.createClient({
  password: process.env.Redis_password,
  socket: {
    host: "redis-15483.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 15483, // ✅ Use TLS port
    tls: false,
    // connectTimeout: 10000, // 10 seconds
  },
});

Redisclient.on("connect", () => console.log("Connected to Redis..."));
Redisclient.on("error", (err) => console.error("Redis error:", err));

(async () => {
  try {
    await Redisclient.connect();
    console.log("Redis connection established successfully");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();


const port = process.env.PORT || 8000;
app.use(express.json());



app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
res.send('Hello World!');
});

app.use('/api/v1',SongRouter);














