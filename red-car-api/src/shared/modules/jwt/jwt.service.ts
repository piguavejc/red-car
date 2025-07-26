import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/module/user/entity/user.entity';

@Injectable()
export class JwtService {
  async verifyToken(token: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
}
