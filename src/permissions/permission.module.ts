import { Module } from '@nestjs/common';

import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionEntity } from './permission.entity';

@Module({
  imports: [],
  providers: [PermissionService, PermissionResolver, PermissionEntity],
})
export class PermissionModule {}
