import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { isNotFoundExceptions } from '../error-handler/error-handler.utils';
import { RoleType } from './types/role.type';
import { RoleService } from './role.service';
import { CreateRoleArgument } from './arguments/create-role.argument';
import { IRole } from './interfaces/role.interface';
import { UpdateRoleArgument } from './arguments/update-role.argument';
import { GetRoleListArgument } from './arguments/get-role-list.argument';
import { RoleListType } from './types/role-list.type';

@Resolver(() => RoleType)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleType)
  async createRole(@Args() input: CreateRoleArgument): Promise<IRole | never> {
    const roles: IRole[] = await this.roleService.createRole(input);
    return isNotFoundExceptions<IRole>(roles, 'Role not found.');
  }

  @Mutation(() => RoleType)
  async updateRole(@Args() input: UpdateRoleArgument): Promise<IRole | never> {
    const roles: IRole[] = await this.roleService.updateRole(input);
    return isNotFoundExceptions<IRole>(roles, 'Role not found.');
  }

  @Mutation(() => Boolean)
  async removeRole(@Args('uuid') uuid: string): Promise<boolean | never> {
    const role: number = await this.roleService.removeRole(uuid);
    return isNotFoundExceptions(role, 'Role not found.');
  }

  @Query(() => RoleListType)
  getRoleList(@Args() input: GetRoleListArgument): Promise<RoleListType> {
    return this.roleService.getListAndCount(input);
  }

  @Query(() => RoleType)
  getRoleByUuid(@Args('uuid') uuid: string): Promise<RoleType> {
    return this.roleService.getRoleByUuid(uuid);
  }
}
