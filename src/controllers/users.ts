import {
  Request,
  Response,
  NextFunction
} from 'express'

import bcrypt from 'bcrypt'

import User from '../models/user'
import userValidator from '../validations/user'

import generateToken from '../utils/generateToken'

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedUser = await userValidator.validateAsync(req.body)
    const user: any = await User.findOne({ email: validatedUser.email })

    const authError = new Error(
      "Authentication credintials are not valid"
    )

    if (!user) return next(authError)

    bcrypt.compare(
      validatedUser.password,
      user.password,
      (error, result) => {
        if (result) {
          res.json({
            email: validatedUser.email,
            token: generateToken(validatedUser.email)
          })
        } else {
          next(error)
        }
      }
    )
  } catch (error) {
    next(error)
  }
}

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedUser = await userValidator.validateAsync(req.body)

    bcrypt.hash(
      validatedUser.password,
      10,
      async (error, hashedPassword) => {
        try {
          const newUser = new User({
            email: validatedUser.email,
            password: hashedPassword
          })
  
          await newUser.save()
  
          res.json({
            email: validatedUser.email,
            token: generateToken(validatedUser.email)
          })
        } catch (error) {
          if (error && error.code === 11000)
            error = new Error('User already exists')

          next(error)
        }
      }
    )
  } catch (error) {
    next(error)
  }
}

export { login , signup }
