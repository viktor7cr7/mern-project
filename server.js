import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import morgan from "morgan";
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import cookieParser from 'cookie-parser'
import { authenticateUser } from './middleware/authMIddleware.js';
import userRouter from './routes/userRouter.js'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';

const app = express()

app.use(cookieParser())
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)


const __dirname = dirname(fileURLToPath(import.meta.url))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')))
  
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use(errorHandlerMiddleware)
app.use('*', (req,res) => {
    res.status(500).json({msg:'no valid path'})
})
const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log('server running')
    })
} catch (error) {
    console.log(error)
    process.exit(1)
}