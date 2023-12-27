import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {
  createProduct,
  getAllProduct
} from '../controllers/productController.js'

export const productRouter = express.Router()

productRouter.get('/product', getAllProduct)
productRouter.post('/product', createProduct)
