import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js'

export const register = async (req, res) => {
  try {
    const userExist = await User.findOne({ username: req.body.username })
    if (userExist) {
      return res.status(409).json({ message: 'User Already Exist' })
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      ...req.body,
      password: hashPassword
    })
    await newUser.save()
    const token = jwt.sign(
      {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )
    res.json({ token: token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const user = await User.findOne({ username: username })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )
    res.json({ message: 'Login successful', token: token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
