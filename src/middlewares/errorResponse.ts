import {
  Request,
  Response,
  NextFunction
} from 'express'

const errorResponse = (error: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    })
}

export default errorResponse
