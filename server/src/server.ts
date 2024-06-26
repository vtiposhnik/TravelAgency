import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.route'
import tourRoutes from './routes/tour.route'
import userRoutes from './routes/user.route'
import { CustomError } from './util/interfaces'
import path from 'path'

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
dotenv.config()
console.log("sldfjlskdjflksdjfl")

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.static(path.join(__dirname, '../../client/dist/assets/index-DmUy4sF0.js'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    },
}));


// MongoDB
if (process.env.MONGO_DB_URI) {
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("MongoDB connected successfully!");
        })
        .catch((error) => {
            console.log(error);
        })
} else {
    console.log('environment variable is undefined!');
}

app.get('/', (req, res: Response) => {
    res.json({ message: 'сервер запущен' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tour', tourRoutes)
app.use('/api/user', userRoutes)

app.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})