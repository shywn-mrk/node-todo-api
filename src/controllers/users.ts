import {
  Request,
  Response,
  NextFunction
} from 'express'

import bcrypt from 'bcrypt'

import User from '../models/user'
import userValidator from '../validations/user'

import generateToken from '../utils/generateToken'

import AuthResponse from '../interfaces/AuthResponse'

class UsersController {
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedUser = await userValidator.validateAsync(req.body)
      const user: any = await User.findOne({ email: validatedUser.email })
  
      if (!user) return next(new Error(
        "Authentication credintials are not valid"
      ))
      
      bcrypt.compare(
        validatedUser.password,
        user.password,
        (error, result) => {
          if (result) {
            const response: AuthResponse = {
              email: validatedUser.email,
              token: generateToken(validatedUser.email)
            }
  
            res.json(response)
          } else {
            next(error)
          }
        }
      )
    } catch (error) {
      next(error)
    }
  }
  
  signup = async (
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
    
            const response: AuthResponse = {
              email: validatedUser.email,
              token: generateToken(validatedUser.email)
            }
  
            res.json(response)
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
}

export default UsersController
