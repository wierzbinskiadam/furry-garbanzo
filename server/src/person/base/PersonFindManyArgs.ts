import { ArgsType, Field } from "@nestjs/graphql";
import { PersonWhereInput } from "./PersonWhereInput";

@ArgsType()
class PersonFindManyArgs {
  @Field(() => PersonWhereInput, { nullable: true })
  where?: PersonWhereInput;
}

export { PersonFindManyArgs };
