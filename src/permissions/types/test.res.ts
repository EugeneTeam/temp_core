import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestRes {
  @Field(() => Boolean)
  result: boolean;
}
