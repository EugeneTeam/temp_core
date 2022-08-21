import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRoleArgument {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
