import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionType } from './types/permission.type';
import { CreatePermissionArgument } from './arguments/create-permission.argument';
import { PermissionService } from './permission.service';
import { IPermission } from './interfaces/permission.interface';
import { UpdatePermissionArgument } from './arguments/update-permission.argument';
import { PermissionListType } from './types/permission-list.type';
import { GetPermissionListArgument } from './arguments/get-permission-list.argument';
import { isNotFoundExceptions } from '../error-handler/error-handler.utils';

@Resolver(() => PermissionType)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => PermissionType)
  async createPermission(
    @Args() input: CreatePermissionArgument,
  ): Promise<IPermission | never> {
    const permissions: IPermission[] =
      await this.permissionService.createPermission(input);
    return isNotFoundExceptions<IPermission>(
      permissions,
      'Permission not found.',
    );
  }

  @Mutation(() => PermissionType)
  async updatePermission(
    @Args() input: UpdatePermissionArgument,
  ): Promise<IPermission | never> {
    const permissions: IPermission[] =
      await this.permissionService.updatePermission(input);
    return isNotFoundExceptions<IPermission>(
      permissions,
      'Permission not found.',
    );
  }

  @Mutation(() => Boolean)
  async removePermission(@Args('uuid') uuid: string): Promise<boolean | never> {
    const permission: number = await this.permissionService.removePermission(
      uuid,
    );
    return isNotFoundExceptions(permission, 'Permission not found.');
  }

  @Query(() => PermissionListType)
  getPermissionList(
    @Args() input: GetPermissionListArgument,
  ): Promise<PermissionListType> {
    return this.permissionService.getListAndCount(input);
  }

  @Query(() => PermissionType)
  getPermissionByUuid(@Args('uuid') uuid: string): Promise<PermissionType> {
    return this.permissionService.getPermissionByUuid(uuid);
  }
}
