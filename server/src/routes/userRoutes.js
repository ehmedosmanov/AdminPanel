import express from 'express'
import {
  addToBasket,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
} from '../controllers/userController.js'
import { checkRole, verifyToken } from '../middlewares/verifyToken.js'

export const userRouter = express.Router()

userRouter.get(
  '/user',
  verifyToken,
  checkRole(['admin', 'superAdmin']),
  getAllUsers
)
userRouter.get(
  '/user/:id',
  verifyToken,
  checkRole(['admin', 'superAdmin']),
  getUser
)
userRouter.delete(
  '/user/:id',
  verifyToken,
  checkRole(['superAdmin']),
  deleteUser
)
userRouter.put('/user/:id', verifyToken, checkRole(['superAdmin']), updateUser)
userRouter.post('/user', verifyToken, checkRole(['superAdmin']), createUser)
userRouter.post('/user/:id/basket', verifyToken, addToBasket)
