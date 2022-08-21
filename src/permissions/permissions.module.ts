import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { PermissionsEntity } from './permissions.entity';

@Module({
  imports: [],
  providers: [PermissionsService, PermissionsResolver, PermissionsEntity],
})
export class PermissionsModule {}
