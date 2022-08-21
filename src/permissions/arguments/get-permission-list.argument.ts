import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PERMISSION } from '../constants/pagination.constant';

@ArgsType()
export class GetPermissionListArgument {
  @Field(() => Int, {
    nullable: true,
    defaultValue: PERMISSION.PAGINATION.DEFAULT.LIMIT,
    description: `Default value for limit = ${PERMISSION.PAGINATION.DEFAULT.LIMIT}`,
  })
  limit?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: PERMISSION.PAGINATION.DEFAULT.OFFSET,
    description: `Default value for offset = ${PERMISSION.PAGINATION.DEFAULT.OFFSET}`,
  })
  offset?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Search by full or partial match',
  })
  name?: string;
}
