import {
  Request,
  Response,
  NextFunction
} from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import userValidator from '../validations/user'

const generateToken = (email: string) => {
  return jwt.sign(
    { email },
    process.env.SECRET_KEY as string,
    { expiresIn: '2h' }
  )
}

const auth = async (
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

const register = async (
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
        const newUser = new User({
          email: validatedUser.email,
          password: hashedPassword
        })

        await newUser.save()

        res.json({
          email: validatedUser.email,
          token: generateToken(validatedUser.email)
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export { auth, register }
