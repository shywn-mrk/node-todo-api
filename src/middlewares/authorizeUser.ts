import {
  Request,
  Response,
  NextFunction
} from 'express'

import jwt from 'jsonwebtoken'

const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization?.split(' ')[1]
    
    const decoded = jwt.verify(token, 'Secret_KeY_nOT-fOUND@!');

    next()
  } catch (error) {
    console.log("You shall not pass")

    next(error)
  }
}

export default authorizeUser
