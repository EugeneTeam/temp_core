import { ArgsType, Field } from '@nestjs/graphql';

import { CreateRoleArgument } from './create-role.argument';

@ArgsType()
export class UpdateRoleArgument extends CreateRoleArgument {
  @Field()
  uuid: string;
}
