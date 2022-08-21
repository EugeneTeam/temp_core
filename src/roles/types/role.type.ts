import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleType {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
