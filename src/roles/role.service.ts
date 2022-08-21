import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { ICount } from '../interfaces/count.interface';
import { CreateRoleArgument } from './arguments/create-role.argument';
import { IRole } from './interfaces/role.interface';
import { UpdateRoleArgument } from './arguments/update-role.argument';
import { GetRoleListArgument } from './arguments/get-role-list.argument';
import { RoleListType } from './types/role-list.type';

@Injectable()
export class RoleService {
  private readonly currentTableName = 'roles';

  constructor(@InjectModel() private knex: Knex) {}

  async createRole(input: CreateRoleArgument): Promise<IRole[]> {
    return this.knex.table(this.currentTableName).insert(input).returning('*');
  }

  updateRole(input: UpdateRoleArgument): Promise<IRole[]> {
    return this.knex
      .table(this.currentTableName)
      .where('uuid', input.uuid)
      .update({
        name: input.name,
        description: input.description,
      })
      .returning('*');
  }

  removeRole(uuid: string): Promise<number> {
    return this.knex.table(this.currentTableName).where('uuid', uuid).del();
  }

  async getListAndCount(input: GetRoleListArgument): Promise<RoleListType> {
    const roles: IRole[] = await this.getRolesWithFilter(input);

    const count: ICount[] = await this.getCountWithFilter(input?.name);

    return {
      roles,
      count: count?.shift().count,
    };
  }

  async getRoleByUuid(uuid: string): Promise<IRole> {
    const role: IRole = await this.knex
      .table(this.currentTableName)
      .where('uuid', uuid)
      .first();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  private async getRolesWithFilter(
    input: GetRoleListArgument,
  ): Promise<IRole[]> {
    return this.knex
      .table(this.currentTableName)
      .limit(input.limit)
      .offset(input.offset)
      .modify((builder) => {
        if (input.name) {
          builder.where('name', 'like', `%${input.name}%`);
        }
      });
  }

  private async getCountWithFilter(name?: string): Promise<ICount[]> {
    return this.knex
      .table(this.currentTableName)
      .modify((builder) => {
        if (name) {
          builder.where('name', 'like', `%${name}%`);
        }
      })
      .count({ count: '*' });
  }
}
