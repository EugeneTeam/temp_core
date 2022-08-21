import { ArgsType, Field, Int } from '@nestjs/graphql';

import { PAGINATION } from '../../constants/pagination.constant';

@ArgsType()
export class GetRoleListArgument {
  @Field(() => Int, {
    nullable: true,
    defaultValue: PAGINATION.ROLE.DEFAULT.LIMIT,
    description: `Default value for limit = ${PAGINATION.ROLE.DEFAULT.LIMIT}`,
  })
  limit?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: PAGINATION.ROLE.DEFAULT.OFFSET,
    description: `Default value for offset = ${PAGINATION.ROLE.DEFAULT.OFFSET}`,
  })
  offset?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Search by full or partial match',
  })
  name?: string;
}
