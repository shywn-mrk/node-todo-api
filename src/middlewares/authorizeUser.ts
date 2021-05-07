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
    
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);

    req.user = decoded.email

    next()
  } catch (error) {
    next(error)
  }
}

export default authorizeUser
