import jwt from 'jsonwebtoken'

const generateToken = (email: string) => {
  return jwt.sign(
    { email },
    process.env.SECRET_KEY as string,
    { expiresIn: '2h' }
  )
}

export default generateToken
