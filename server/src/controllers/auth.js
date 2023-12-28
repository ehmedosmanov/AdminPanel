import mongoose from 'mongoose'
import express from 'express'
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
    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true, // Set to true if using HTTPS
      sameSite: 'None'
    })
    console.log(refreshToken)
    res.json({ token: accessToken })
  } catch (error) {
    console.error('Error:', error)
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
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true, // Set to true if using HTTPS
      sameSite: 'None'
    })

    res.json({ message: 'Login successful', token: accessToken })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    res.json({ message: 'Logout successful' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
      return res.status(401).json({ message: 'Refresh Token is MISSING' })
    console.log('sa', refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const findUser = await User.findById(decoded.userId)
    if (!findUser) return res.status(404).json({ message: 'User Not Found' })

    const newToken = generateAccessToken(findUser)
    console.log('NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW', newToken)
    res.status(200).json({ token: newToken })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const generateAccessToken = user => {
  try {
    return jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '2m' }
    )
  } catch (error) {
    console.error('Error generating access token:', error)
    throw error
  }
}

const generateRefreshToken = user => {
  try {
    return jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '30d' }
    )
  } catch (error) {
    console.error('Error generating refresh token:', error)
    throw error
  }
}
