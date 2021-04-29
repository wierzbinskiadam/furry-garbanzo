import { ArgsType, Field } from "@nestjs/graphql";
import { PersonWhereUniqueInput } from "./PersonWhereUniqueInput";

@ArgsType()
class PersonFindUniqueArgs {
  @Field(() => PersonWhereUniqueInput, { nullable: false })
  where!: PersonWhereUniqueInput;
}

export { PersonFindUniqueArgs };
