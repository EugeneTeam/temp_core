import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PermissionType } from './permission.type';

@ObjectType()
export class PermissionListType {
  @Field(() => [PermissionType], { nullable: true, defaultValue: [] })
  permissions?: PermissionType[];

  @Field(() => Int, { nullable: true })
  count?: number;
}
