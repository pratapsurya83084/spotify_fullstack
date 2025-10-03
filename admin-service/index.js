import express from "express";
import dotenv from "dotenv";
import { sql } from "./src/config/db.connection.js";
import adminRoute from './src/routes/admin.route.js';
import cookieParser from "cookie-parser";


const app = express();

dotenv.config();


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

// app.get('/u',(req,res)=>{
//   res.send("work here...");
// })

//routes
app.use("/api/v1", adminRoute);

