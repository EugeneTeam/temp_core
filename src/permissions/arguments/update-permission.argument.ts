import { ArgsType, Field } from '@nestjs/graphql';

import { CreatePermissionArgument } from './create-permission.argument';

@ArgsType()
export class UpdatePermissionArgument extends CreatePermissionArgument {
  @Field()
  uuid: string;
}
