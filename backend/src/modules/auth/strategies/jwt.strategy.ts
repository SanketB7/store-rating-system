import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
  console.log(
    'JWT SECRET USED:',
    process.env.JWT_SECRET || 'your_jwt_secret_key_here'
  );

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    });
  }

  async validate(payload: any) {
  console.log('JWT PAYLOAD:', payload);

  return {
    userId: payload.sub,
    email: payload.email,
    role: payload.role,
    };
  }
}
