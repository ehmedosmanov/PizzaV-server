import User from '../models/user.model.js'
import bcrypt, { genSalt } from 'bcrypt'

export const createUser = async (req, res, next) => {
  const { username, password, role_id } = req.body
  try {
    if (!username || !password || !role_id) {
      return res
        .status(400)
        .json({ status: false, message: 'All fields are required' })
    }

    const existUser = await User.findByUsername(username)
    if (existUser) {
      return res
        .status(409)
        .json({ status: false, message: 'User already exists' })
    }

    const salt = await genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    console.log(req.body)

    const newUser = await User.create({
      username,
      password: hashPassword,
      role_id
    })

    res.status(201).json({
      status: true,
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    next(error)
  }
}



