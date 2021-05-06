import {
  Request,
  Response,
  NextFunction
} from 'express'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Not found')
  error.status = 404
  next(error)
}

export default notFound
