import express, { Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

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
    res.json({ message: 'server running' })
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on https://localhost/${port}`)
})