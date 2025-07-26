// src/modules/casbin/casbin.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { EntityManager } from 'typeorm';

@Injectable()
export class CasbinService {
  constructor(
    @Inject('CASBIN_ENFORCER') private readonly enforcer: Enforcer,
    private readonly entityManager: EntityManager,
  ) {}
}
