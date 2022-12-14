import { ArgsType, Field, Int } from '@nestjs/graphql';

import { PAGINATION } from '../../constants/pagination.constant';

@ArgsType()
export class GetPermissionListArgument {
  @Field(() => Int, {
    nullable: true,
    defaultValue: PAGINATION.PERMISSION.DEFAULT.LIMIT,
    description: `Default value for limit = ${PAGINATION.PERMISSION.DEFAULT.LIMIT}`,
  })
  limit?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: PAGINATION.PERMISSION.DEFAULT.OFFSET,
    description: `Default value for offset = ${PAGINATION.PERMISSION.DEFAULT.OFFSET}`,
  })
  offset?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Search by full or partial match',
  })
  name?: string;
}
