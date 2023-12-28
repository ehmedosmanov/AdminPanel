import express from 'express'
import { login, logout, refreshToken, register } from '../controllers/auth.js'

export const authRouter = express.Router()

authRouter.post('/auth/register', register)
authRouter.post('/auth/login', login)
authRouter.post('/auth/refresh', refreshToken)
authRouter.post('/auth/logout', logout)
