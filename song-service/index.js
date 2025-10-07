import express from 'express';
import dotenv from 'dotenv';
import SongRouter  from './src/route.js';
import  redis from 'redis';



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





const port = process.env.PORT || 8000;
app.use(express.json());



app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});



app.get('/', (req, res) => {
res.send('Hello World!');
});

app.use('/api/v1',SongRouter);














