import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionArgument } from './arguments/create-permission.argument';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { IPermission } from './interfaces/permission.interface';
import { UpdatePermissionArgument } from './arguments/update-permission.argument';
import { GetPermissionListArgument } from './arguments/get-permission-list.argument';
import { PermissionListType } from './types/permission-list.type';
import { ICount } from '../interfaces/count.interface';

@Injectable()
export class PermissionService {
  private readonly currentTableName = 'permissions';

  constructor(@InjectModel() private knex: Knex) {}

  async createPermission(
    input: CreatePermissionArgument,
  ): Promise<IPermission[]> {
    return this.knex.table(this.currentTableName).insert(input).returning('*');
  }

  updatePermission(input: UpdatePermissionArgument): Promise<IPermission[]> {
    return this.knex
      .table(this.currentTableName)
      .where('uuid', input.uuid)
      .update({
        name: input.name,
        description: input.description,
      })
      .returning('*');
  }

  removePermission(uuid: string): Promise<number> {
    return this.knex.table(this.currentTableName).where('uuid', uuid).del();
  }

  async getListAndCount(
    input: GetPermissionListArgument,
  ): Promise<PermissionListType> {
    const permissions: IPermission[] = await this.getPermissionsWithFilter(
      input,
    );

    const count: ICount[] = await this.getCountWithFilter(input?.name);

    return {
      permissions,
      count: count?.shift().count,
    };
  }

  async getPermissionByUuid(uuid: string): Promise<IPermission> {
    const permission: IPermission = await this.knex
      .table(this.currentTableName)
      .where('uuid', uuid)
      .first();

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  private async getPermissionsWithFilter(
    input: GetPermissionListArgument,
  ): Promise<IPermission[]> {
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
