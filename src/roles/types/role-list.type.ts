import { Field, Int, ObjectType } from '@nestjs/graphql';

import { RoleType } from './role.type';

@ObjectType()
export class RoleListType {
  @Field(() => [RoleType], { nullable: true, defaultValue: [] })
  roles?: RoleType[];

  @Field(() => Int, { nullable: true })
  count?: number;
}
