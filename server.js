import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'
import path from 'path';
// env config
dotenv.config();

// database config
connectDB();

// rest object
const app  = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes)

// rest api
// app.get('/',(req,res)=>{
//     res.send("<h1>Welcome to E-commerse App</h1>");
    
// });

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})

// port
const PORT= process.env.PORT||8080;

// run listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan.white); // adding color to show on console
})