import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split([' '])[1]
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    res.user = { userId: decodeToken.userId, role: decodeToken.role }
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const checkRole = roles => {
  return (req, res, next) => {
    const userRole = res.user.role

    if (roles.includes(userRole)) {
      next()
    } else {
      res.status(403).json({ message: 'Forbidden' })
    }
  }
}
