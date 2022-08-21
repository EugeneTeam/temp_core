import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreatePermissionArguments {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
