import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleEntity } from './role.entity';

@Module({
  imports: [],
  providers: [RoleResolver, RoleService, RoleEntity],
})
export class RoleModule {}
