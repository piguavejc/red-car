/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/shared/modules/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    // Manejo de WebSocket Connection
    const authorization = gqlContext.authorization as string;
    if (authorization) {
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token missing for WebSocket');
      }

      try {
        const user = await this.jwtService.verifyToken(token);
        gqlContext.user = {
          id: user.id,
          role: user.role,
        }; // Injecta el usuario en el contexto
        return true;
      } catch {
        throw new UnauthorizedException('Invalid token for WebSocket');
      }
    }

    // Manejo de HTTP/GraphQL Request
    const req = gqlContext.req;
    if (req) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException(
          'Authorization header missing for HTTP',
        );
      }

      const token: string = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token missing for HTTP');
      }

      const user = await this.jwtService.verifyToken(token);

      req.user = {
        id: user.id,
        role: user.role,
      };
      return true;
    }

    throw new UnauthorizedException('Invalid context');
  }
}
