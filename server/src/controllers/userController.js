import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('basket.product')
    if (!users) return res.status(404).json({ message: 'User not found' })
    res.json({ users: users })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const userExist = await User.findOne({ username: username })
    if (userExist)
      return res.status(404).json({ message: 'User Already Exist' })
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      ...req.body,
      password: hashPassword
    })
    await newUser.save()
    res.status(200).json({ message: 'User Created', user: newUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleteUser = await User.findByIdAndDelete(id)
    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' })
    } else {
      res.status(200).json({ message: 'User Deleted', user: deleteUser })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('basket.product')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    } else {
      res.status(200).json({ message: 'User Deleted', user: user })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const findUser = await User.findById(id)
    const hash = await bcrypt.hash(req.body.password, 10)
    if (findUser) {
      findUser.username = req.body.username
      findUser.email = req.body.email
      findUser.role = req.body.role
      findUser.password = hash
      await findUser.save()
    }
    res.status(200).json({ message: 'user updated', updatedUser: updateUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addToBasket = async (req, res) => {
  try {
    const { productId } = req.body
    const user = await User.findById(req.params.id).populate('basket.product')
    if (!user) return res.status(404).json({ message: 'User Not Found' })
    const productExist = user.basket.find(
      x => x.product._id.toString() === productId.toString()
    )
    console.log(productExist)
    if (productExist) {
      console.log('QUNATITY ARTDI OLDUNDU')
      productExist.quantity++
    } else {
      console.log('BASKET ELAVE OLDUNDU')
      user.basket.push({ product: productId, quantity: 1 })
    }
    await user.save()
    res.status(200).json({ message: 'Product added to basket', user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
