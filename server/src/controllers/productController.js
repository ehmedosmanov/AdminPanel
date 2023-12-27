import { Product } from '../models/productModel.js'

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body
    })
    await newProduct.save()
    res.status(201).json({ message: 'Product Created', products: newProduct })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products: products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
