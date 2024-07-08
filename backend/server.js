import connectDB from "./config/db.js";
import express from 'express'
import studentRoutes from './routes/studentRoutes.js'
import cors from 'cors'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/student', studentRoutes);

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`server started on the PORT ${PORT}`))