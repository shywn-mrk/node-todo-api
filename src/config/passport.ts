import passport from 'passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { Strategy as GoogleOAuth2Strategy } from 'passport-google-oauth2'

import User from '../models/user'

const JwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_KEY,
}, async (payload, done) => {
  try {
    const user = User.findOne({email: payload.email})

    if (!user) return done(null, false)

    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

const GoogleStrategy = new GoogleOAuth2Strategy({
  clientID: process.env.GOOGLE_CONSUMER_KEY as string,
  clientSecret: process.env.GOOGLE_CONSUMER_SECRET as string,
  callbackURL: `http://127.0.0.1:${process.env.PORT}/auth/google/callback`,
  passReqToCallback: true
}, (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
  console.log('request', request)
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('profile', profile)

  done(null, profile)
})

passport.use(JwtStrategy)
passport.use(GoogleStrategy)
