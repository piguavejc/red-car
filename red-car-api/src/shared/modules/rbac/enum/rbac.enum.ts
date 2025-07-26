import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  SuperAdmin = 'super-admin',
  Admin = 'admin',
  Counter = 'counter',
  Customer = 'customer',
  User = 'user',
  Operator = 'operator',
  Developer = 'developer',
  Custom = 'custom',
}

registerEnumType(Role, {
  name: 'Role',
});
