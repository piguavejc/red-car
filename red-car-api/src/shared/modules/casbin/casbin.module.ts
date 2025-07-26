import { Module } from '@nestjs/common';
import { CasbinService } from 'src/shared/modules/casbin/casbin.service';
import { CasbinEnforcerProvider } from 'src/shared/modules/casbin/provider/casbin.provider';

@Module({
  providers: [CasbinEnforcerProvider, CasbinService],
  exports: [CasbinEnforcerProvider, CasbinService],
})
export class CasbinModule {}
