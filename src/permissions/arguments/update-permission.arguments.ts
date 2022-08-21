import { ArgsType, Field } from '@nestjs/graphql';

import { CreatePermissionArguments } from './create-permission.arguments';

@ArgsType()
export class UpdatePermissionArguments extends CreatePermissionArguments {
  @Field()
  uuid: string;
}
