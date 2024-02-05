import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import Role from 'src/user/role.enum';
import { UserDocument } from 'src/user/schemas/user.schema';

interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
  roles: Role[];
  username: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate({ username }: JwtPayload): Promise<UserDocument> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    user.username = username;
    return user;
  }
}
