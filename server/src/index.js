import express from 'express'
import dotenv from 'dotenv'
import mongooose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { productRouter } from './routes/productRoutes.js'
const app = express()

dotenv.config()
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)
app.use(cookieParser())

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', productRouter)

const URL = process.env.CONNECTION_URL.replace(
  '<password>',
  process.env.password
)

const port = process.env.PORT || 8000

mongooose
  .connect(URL)
  .catch(err => console.log(`Error connection to database - ${err}`))

app.listen(port, (req, res) => {
  console.log(`Connection to ${port}`)
})
