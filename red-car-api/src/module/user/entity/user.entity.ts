import { Authorize, FilterableField } from '@nestjs-query/query-graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/shared/entity/common-entity';
import { createGenericAuthorizer } from 'src/shared/hooks/generic-authorizer';
import { Role } from 'src/shared/modules/rbac/enum/rbac.enum';

@Entity('users')
@ObjectType('User')
@Authorize(createGenericAuthorizer(UserEntity))
export class UserEntity extends CommonEntity {
  @FilterableField(() => String)
  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @FilterableField(() => Role)
  @IsEnum(Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role!: Role;
}
