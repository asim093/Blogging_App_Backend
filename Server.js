import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import UserRoutes from './src/Routes/User.routes.js'
import BlogRoutes from './src/Routes/Blogs.routes.js'
dotenv.config();
const app = express();

app.use(express.json());
app.use('/Blogging' , UserRoutes );
app.use('/Blogging' , BlogRoutes );



connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
