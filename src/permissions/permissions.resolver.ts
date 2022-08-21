import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionType } from './types/permission.type';
import { CreatePermissionArguments } from './arguments/create-permission.arguments';
import { PermissionsService } from './permissions.service';
import { IPermission } from './interfaces/permission.interface';
import { UpdatePermissionArguments } from './arguments/update-permission.arguments';
import { PermissionListType } from './types/permission-list.type';
import { GetPermissionListArgument } from './arguments/get-permission-list.argument';
import { isNotFoundExceptions } from '../error-handler/error-handler.utils';

@Resolver(() => PermissionType)
export class PermissionsResolver {
  constructor(private readonly permissionService: PermissionsService) {}

  @Mutation(() => PermissionType)
  async createPermission(
    @Args() input: CreatePermissionArguments,
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
    @Args() input: UpdatePermissionArguments,
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
